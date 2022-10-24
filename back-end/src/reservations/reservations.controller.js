const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./reservations.service")

const { DateTime, Settings } = require("luxon")

Settings.defaultZoneName = "America/Michigan"

// crud functions

async function list(req, res) {
  const { date, phase = "all" } = req.query
  if (phase === "all") res.json({ data: await service.listAllReservations(date) })
  if (phase === "booked" || phase === "seated" || phase === "finished") {
    res.json({ data: await service.listReservationsByPhase(date, phase) })
  }
}

async function read(req, res) {
  const reservation = await service.read(req.params.reservation_id)
  res.json({ data: reservation })
}

async function create(req, res) {
  const data = await service.create(req.body.data)
  res.status(201).json({ data })
}

async function update(req, res) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: req.params.reservation_id,
  }
  const data = await service.update(updatedReservation)
  res.json({ data })
}

async function destroy(req, res){
  await service.destroy(req.params.reservation_id)
  res.sendStatus(204)
}

async function finish(req, res){
  const data = await service.finish(req.params.reservation_id)
  res.json({ data })
}

// Middleware validation

async function reservationExists(req, res, next) {
  const reservation = await service.read(req.params.reservation_id)
  if (reservation) {
    res.locals.reservation = reservation
    return next()
  }
  next({ status: 404, message: `Reservation ${req.params.reservation_id} not found.` })
}

async function hasReservationId(req, res, next) {
  const { reservationId } = req.params
  if (!reservationId) {
    return next({
      status: 404,
      message: `The following 'reservation_id' could not be found: ${reservationId}`
    })
  }
  res.locals.reservationId = reservationId
  next()
}

async function hasValidProperties(req, res, next) {
  const { data: { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = {} } = req.body
  if (first_name && last_name && mobile_number && reservation_date && reservation_time && people) {
    return next()
  }
  next({ status: 400, message: "Reservation must include first_name, last_name, mobile_number, reservation_date, reservation_time, and people." })
}

async function hasValidDate(req, res, next) {
  const { reservation_date } = res.locals.reservation
  if (!DateTime.fromISO(reservation_date).isValid) {
    return next ({
      status: 400,
      message: "A valid 'reservation_date' must be provided."
    })
  }
  next()
}

async function hasValidTime(req, res, next) {
  const { reservation_time } = res.locals.reservation
  if (!DateTime.fromISO(reservation_time).isValid) {
    return next ({
      status: 400,
      message: "A valid 'reservation_time' must be provided."
    })
  }
  next()
}

async function dateIsNotOnTuesday(req, res, next) {
  const { reservation_date } = res.locals.reservation
  if (DateTime.fromISO(reservation_date).weekday === 2) {
    return next({
      status: 400,
      message: "Reservations cannot be made on Tuesdays."
    })
  }
  next()
}

async function dateIsNotInThePast(req, res, next) {
  const { reservation_date, reservation_time } = res.locals.reservation
  const reservationDateTime = DateTime.fromISO(`${reservation_date}T${reservation_time}`)
  if (reservationDateTime < DateTime.now()) {
    return next({
      status: 400,
      message: "Reservations cannot be made in the past."
    })
  }
  next()
}

// verfies that 'people' is a number and is greater than 0

async function hasValidPeople(req, res, next) {
  const { people } = res.locals.reservation
  if (typeof people !== "number" || people < 1) {
    return next({
      status: 400,
      message: "A valid 'people' value must be provided."
    })
  }
  next()
}

// Verifies that the `reservation_time` falls within the restaurant being open and within one hour of the restaurant closing.

async function hasValidTimeRange(req, res, next) {
  const { reservation_time } = res.locals.reservation
  const reservationTime = DateTime.fromISO(reservation_time)
  const restaurantOpenTime = DateTime.fromISO("10:30")
  const restaurantCloseTime = DateTime.fromISO("21:30")
  if (reservationTime < restaurantOpenTime || reservationTime > restaurantCloseTime) {
    return next({
      status: 400,
      message: "Reservations must be made between 10:30 AM and 9:30 PM."
    })
  }
  next()
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [hasReservationId, asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  create: [hasValidProperties, hasValidDate, hasValidTime, dateIsNotOnTuesday, dateIsNotInThePast, hasValidPeople, hasValidTimeRange, asyncErrorBoundary(create)],
  update: [hasReservationId, asyncErrorBoundary(reservationExists), hasValidProperties, hasValidDate, hasValidTime, dateIsNotOnTuesday, dateIsNotInThePast, hasValidPeople, hasValidTimeRange, asyncErrorBoundary(update)],
  destroy: [hasReservationId, asyncErrorBoundary(reservationExists), asyncErrorBoundary(destroy)],
  finish: asyncErrorBoundary(finish),
}
