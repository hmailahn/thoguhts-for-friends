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
  .route("/:thoughtsId")
  .get(getThoughtById)
  .put(updateThoughts)
  .delete(removeThoughts);

router
.route("/:thoughtsId/reactions")
.post(addReaction);

router
.route("/:thoughtsId/:reactionsId")
.delete(removeReaction);

module.exports = router;
