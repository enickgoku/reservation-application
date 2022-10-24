const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const reservationsService = require("./reservations.service")

import { DateTime, Settings } from "luxon"

Settings.defaultZoneName = "America/Michigan"

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

module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
  create: asyncErrorBoundary(create),
  update: asyncErrorBoundary(update),
  destroy: asyncErrorBoundary(destroy),
  finish: asyncErrorBoundary(finish),
}
