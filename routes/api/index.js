import { Router } from "express";
import usersRoutes from "./users.js";
import thoughtsRoutes from "./thoughts.js";

const router = Router();

router.use("/users", usersRoutes);
router.use("/thoughts", thoughtsRoutes);

export default router;
