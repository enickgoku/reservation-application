const tableService = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res, next) {
  const data = await tableService.list()
  res.json({ data })
}

module.exports = {
  list: asyncErrorBoundary(list),
}