import { Router } from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/category.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../controllers/admin.controller.js";

const router = Router();

router
  .route("/createCategory")
  .post(verifyJWT, authorizeRoles("ADMIN"), createCategory);
router.route("/getCategories").get(getCategories);

export default router;