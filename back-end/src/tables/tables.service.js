const knex = require("../db/connection")

function list() {
  return knex("tables")
    .select("*")
    .orderBy("table_name")
}

function listFreeTables() {
  return knex("tables")
    .select("*")
    .whereNull("reservation_id")
    .orderBy("table_name")
}

function listSeatedTables() {
  return knex("tables")
    .select("*")
    .whereNotNull("reservation_id")
    .orderBy("table_name")
}

function createTable(data) {
  return knex("tables")
    .insert(data, "*")
    .then((tables) => tables[0])
}

function getTableById(table_id){
  return knex("tables")
    .where({table_id: table_id})
    .first()
}

function updateTable(table){
  return knex("tables")
    .where({ table_id: table.table_id })
    .update({
      table_name: table.table_name,
      capacity: table.capacity
    })
}

function deleteTable(table_id){
  return knex("tables")
    .where({ table_id: table_id })
    .del()
}

function getSizeOfReservation(reservationId){
  return knex("reservations")
    .where({ reservation_id: reservationId })
    .select("people")
    .first()
}

function assignReservation(reservationId, table_id) {
  return knex.transaction((trx) => {
      return trx("tables")
          .where({ table_id: table_id })
          .update({ reservation_id: reservationId }, ["table_name"])
          .then((tables) => {
              return trx("reservations")
                  .where({ reservation_id: reservationId })
                  .update({
                      status: "seated",
                      current_table: tables[0].table_name
                  })
          })
          .catch(console.error)
  })
  .catch(console.error)
}

function dismissTable(table_id, reservationId) {
  return knex.transaction((trx) => {
      return trx("tables")
          .where({ table_id: table_id })
          .update({ reservation_id: null })
          .then(() => {
              return trx("reservations")
                  .where({ reservation_id: reservationId })
                  .update({
                      status: "finished",
                      current_table: null         
                  })
          })
          .catch(console.error)
  })
  .catch(console.error)
}

module.exports = {
  list,
  listFreeTables,
  listSeatedTables,
  createTable,
  getTableById,
  updateTable,
  deleteTable,
  getSizeOfReservation,
  assignReservation,
  dismissTable
}
