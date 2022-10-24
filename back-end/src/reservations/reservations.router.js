const methodNotAllowed = require("../errors/methodNotAllowed")

const router = require("express").Router()
const controller = require("./reservations.controller")

router.route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed)

router.route("/:reservation_id")
  .get(controller.read)
  .delete(controller.delete)
  .all(methodNotAllowed)

router.route("/:reservation_id/edit")
  .delete(controller.destroy)
  .put(controller.update)
  .all(methodNotAllowed)

router.route("/:reservation_id/status")
  .put(controller.finished)
  .all(methodNotAllowed)

module.exports = router
