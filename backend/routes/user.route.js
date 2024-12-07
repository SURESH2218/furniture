import { Router } from "express";
import userRegister, {
  logoutUser,
  userLogin,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/login").get(userLogin);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
