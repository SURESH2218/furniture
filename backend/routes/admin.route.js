import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  authorizeRoles,
  getAllUsers,
} from "../controllers/admin.controller.js";

const router = Router();

router
  .route("/all-users")
  .post(verifyJWT, authorizeRoles("ADMIN"), getAllUsers);

export default router;