const tableService = require("./tables.service")

async function list(req, res, next) {
  tableService
    .list()
    .then((data) => res.json(data))
    .catch(next)
}

module.exports = {
  list,
}