import { Router } from "express";
import userRegister, {
  changePassword,
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
router.route("/change-password").post(verifyJWT, changePassword);

export default router;
