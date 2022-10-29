const methodNotAllowed = require("../errors/methodNotAllowed")

const router = require("express").Router()
const controller = require("./reservations.controller")

router.route("/:reservation_id")
  .get(controller.read)
  .delete(controller.destroy)
  .all(methodNotAllowed)

router.route("/:reservation_id/edit")
  .put(controller.update)
  .delete(controller.destroy)
  .all(methodNotAllowed)

router.route("/:reservation_id/status")
  .put(controller.finish)
  .all(methodNotAllowed)

router.route("/")
  .get(controller.list)
  .get(controller.search)
  .post(controller.create)
  .all(methodNotAllowed)

module.exports = router
