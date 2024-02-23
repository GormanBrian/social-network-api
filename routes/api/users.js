import { Router } from "express";

import {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} from "../../controllers/userController.js";

const router = Router();

router.route("/").get(getAllUsers).post(addUser);
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

export default router;
