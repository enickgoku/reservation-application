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

function getTableById(tableId){
  return knex("tables")
    .where({table_id: tableId})
    .first()
}

function updateTable(table){
  return knex("tables")
    .where({ table_id: table.tableId })
    .update({
      table_name: table.table_name,
      capacity: table.capacity
    })
}

function deleteTable(tableId){
  return knex("tables")
    .where({ table_id: tableId })
    .del()
}

function getSizeOfReservation(reservationId){
  return knex("reservations")
    .where({ reservation_id: reservationId })
    .select("people")
    .first()
}

function assignReservation(reservationId, tableId) {
  return knex.transaction((trx) => {
      return trx("tables")
          .where({ table_id: tableId })
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

function dismissTable(tableId, reservationId) {
  return knex.transaction((trx) => {
      return trx("tables")
          .where({ table_id: tableId })
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
