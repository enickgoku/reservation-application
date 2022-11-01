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

const read = (reservation_id) => {
  return knex("reservations")
      .where({ reservation_id: reservation_id })
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

function finish(reservation_id) {
  return knex.transaction(async (trx) => {
    await trx("reservations")
        .where({ reservation_id })
        .update({ status: "finished" })
    await trx("tables")
        .where({ reservation_id })
        .update({ reservation_id: null })
  })
}

const search = (mobile_number) => {
  return knex("reservations")
    .select("*")
    .where("mobile_number", "like", `%${mobile_number}%`)
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
