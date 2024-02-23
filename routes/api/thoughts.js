import { Router } from "express";
import {
  getAllThoughts,
  addThought,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} from "../../controllers/thoughtController.js";

const router = new Router();

router.route("/").get(getAllThoughts).post(addThought);

router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

export default router;
