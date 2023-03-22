const router = require("express").Router();
const controller = require("./movies.controller");
const theatersRouter = require("../theaters/theaters.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(controller.listReviewsByMovieId)
  .all(methodNotAllowed);

router.use("/:movieId/theaters", theatersRouter);

module.exports = router;
