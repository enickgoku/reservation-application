const knex = require("../db/connection")

const listAllReservations = (date) => {
  return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .orderBy("reservation_time")
}

const listReservationsByPhase = (date, phase) => {
  return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .where("status", phase)
      .orderBy("reservation_time")
}

const create = (reservation) => {
  return knex("reservations")
      .insert(reservation)
      .returning("*")
      .then((createdRecords) => createdRecords[0])
}

const read = (reservationId) => {
  return knex("reservations")
      .where({ reservation_id: reservationId })
      .first()
}

const update = (updatedReservation) => {
  return knex("reservations")
      .select("*")
      .where({ reservation_id: updatedReservation.reservation_id })
      .update(updatedReservation, "*")
}

const destroy = (reservation_id) => {
  return knex("reservations")
      .where({ reservation_id })
      .del()
}

const finish = (reservation_id) => {
  return knex("reservations")
      .select("*")
      .where({ reservation_id })
      .update({ status: "finished" }, "*")
      .then((updatedRecords) => updatedRecords[0])
}

const search = (mobile_number) => {
  return knex("reservations")
    .whereRaw(
    "translate(mobile_number, '() -', '') like ?",
    `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date")
}

module.exports = {
  listAllReservations,
  listReservationsByPhase,
  create,
  read,
  update,
  destroy,
  finish,
  search,
}
