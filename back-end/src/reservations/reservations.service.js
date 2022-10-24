const knex = require("../db/connection")

const listAllReservations = (date) => {
  return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .whereIn("status", ["booked", "seated"])
      .orderBy("reservation_time")
}

module.exports = {
  listAllReservations,
}