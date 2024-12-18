import { Router } from "express";
import userRegister, {
  changePassword,
  getUserDetails,
  logoutUser,
  updateProfile,
  userLogin,
} from "../controllers/user.controller.js";
import {
  refreshAccessToken,
  verifyJWT,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/check-auth").get(verifyJWT, (req, res) => {
  res.status(200).json({ message: "User is authenticated", user: req.user });
});
router.route("/refresh-token").get(refreshAccessToken);
router.route("/update").post(verifyJWT, updateProfile);
router.route("/change-password").post(verifyJWT, changePassword);
router.route("/get-user-details").get(verifyJWT, getUserDetails);

export default router;
