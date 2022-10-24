const knex = require("../db/connection")

const listAllReservations = (date) => {
  return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .whereIn("status", ["booked", "seated"])
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

const read = (reservation_id) => {
  return knex("reservations")
      .select("*")
      .where({ reservation_id })
      .first()
}

const update = (updatedReservation) => {
  return knex("reservations")
      .select("*")
      .where({ reservation_id: updatedReservation.reservation_id })
      .update(updatedReservation, "*")
      .then((updatedRecords) => updatedRecords[0])
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

module.exports = {
  listAllReservations,
  listReservationsByPhase,
  create,
  read,
  update,
  destroy,
  finish,
}
