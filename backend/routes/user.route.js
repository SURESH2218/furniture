import { Router } from "express";
import userRegister, {
  logoutUser,
  updateProfile,
  userLogin,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/login").get(userLogin);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/update").post(verifyJWT, updateProfile);

export default router;
