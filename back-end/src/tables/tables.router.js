const router = require("express").Router()
const controller = require("./tables.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/")
  .get(controller.list)
  .all(methodNotAllowed)

  router.route("/:tableId")
  .get(controller.read)
  .delete(controller.destroy)
  .all(methodNotAllowed)

router.route("/:tableId/edit")
  .put(controller.update)
  .all(methodNotAllowed)

router.route("/:tableId/seat")
  .put(controller.assign)
  .delete(controller.dismiss)
  .all(methodNotAllowed)

module.exports = router
