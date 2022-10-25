const service = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
  const { status = "free" } = req.query
  if (status === "all") {
    res.json({ data: await service.list() })
  }
  if (status === "occupied") {
    res.json({ data: await service.listSeatedTables() })
  }
  if (status === "free") {
    res.json({ data: await service.listFreeTables() })
  }
}

async function read(req, res) {
  const { table } = res.locals
  res.json({ data: table })
}

async function create(req, res) {
  const data = req.body.data
  console.log(data)
  const newTable = await service.create(data)
  res.status(201).json({ data: newTable })
}

async function update(req, res){
  const updatedTable = await service.updateTable(req.body.data)
  res.json({ data: updatedTable})
}

async function destroy(req, res){
  const deletedTable = await service.deleteTable(req.params.tableId)
  res.sendStatus(204)
}

async function seatTable(req, res){
  const { table_id } = req.params
  const { reservation_id } = req.body.data
  const seatedTable = await service.assignReservation(reservation_id, table_id)
  res.json({ data: seatedTable })
}

async function dismissTable(req, res){
  const { table_id } = req.params
  const { reservation_id } = req.body.data
  const dismissedTable = await service.dismissTable(table_id, reservation_id)
  res.json({ data: dismissedTable })
}

//middleware

async function hasTableId(req, res, next){
  const { tableId } = req.params
  if (tableId) {
    return next()
  }
  next({ status: 400, message: "table_id is required." })
}

async function tableExists(req, res, next){
  const table = await service.getTableById(req.params.tableId)
  if (table) {
    res.locals.table = table
    return next()
  }
  next({ status: 404, message: `Table ${req.params.tableId} does not exist.` })
}

async function hasReservationId(req, res, next){
  const { reservation_id } = req.body.data
  if (reservation_id) {
    return next()
  }
  next({ status: 400, message: "reservation_id is required." })
}

async function reservationExists(req, res, next) {
  const { reservationId } = res.locals
  const reservation = await service.getReservationSize(reservationId)
  if (!reservation) {
    return next({
      status: 404,
      message: `Reservation '${reservationId}' does not exist.`
    })
  }
  res.locals.reservation = reservation;
  next()
}

async function tablePropertiesExist(req, res, next){
  const { data: { table_name, capacity } } = req.body
  if (table_name && capacity) {
    return next()
  }
  next({ status: 400, message: "table_name and capacity are required." })
}

async function tableIsFree(req, res, next){
  const { table } = res.locals
  if (table.reservation_id === null) {
    return next()
  }
  next({ status: 400, message: "Table is occupied." })
}

async function tableNameLengthIsMoreThanOne(req, res, next){
  const { table_name } = req.body.data
  if (table_name.length > 1) {
    return next()
  }
  next({ status: 400, message: "Table name must be at least 2 characters." })
}

async function tableHasSufficientCapacity(req, res, next){
  const { table } = res.locals
  const { people } = res.locals.reservation
  if (table.capacity >= people) {
    return next()
  }
  next({ status: 400, message: "Table does not have sufficient capacity." })
}

async function tableIsOccupied(req, res, next) {
  const { table } = res.locals
  if (!table.reservation_id) {
    return next({
      status: 400,
      message: "The selected table is not occupied."
    })
  }
  next()
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [hasTableId, asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
  create: [tablePropertiesExist, tableNameLengthIsMoreThanOne, asyncErrorBoundary(create)],
  update: [hasTableId, asyncErrorBoundary(tableExists), tablePropertiesExist, tableNameLengthIsMoreThanOne, tableIsFree, asyncErrorBoundary(update)],
  assign: [hasTableId, asyncErrorBoundary(tableExists), hasReservationId, asyncErrorBoundary(reservationExists), tableIsFree, tableHasSufficientCapacity, asyncErrorBoundary(seatTable)],
  dismiss: [hasTableId, asyncErrorBoundary(tableExists), tableIsOccupied, asyncErrorBoundary(dismissTable)],
  destroy: [hasTableId, asyncErrorBoundary(tableExists), tableIsFree, asyncErrorBoundary(destroy)],
}
