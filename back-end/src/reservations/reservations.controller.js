const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const reservationsService = require("./reservations.service")

async function list(req, res) {
  reservationsService
    const data = await reservationsService.list()
    res.json({ data })
}



module.exports = {
  list: asyncErrorBoundary(list),
}
