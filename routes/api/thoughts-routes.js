const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
  addReaction,
  removeReaction,
  removeThoughts,
  updateThoughts,
} = require("../../controllers/thoughts-controller");

router
.route("/")
.get(getAllThoughts)
.post(addThought);

router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThoughts)
  .delete(removeThoughts);

router
.route("./:thoughtId/reactions")
.post(addReaction);

router
.route("./:thoughtId/:reactionId")
.delete(removeReaction);

module.exports = router;
