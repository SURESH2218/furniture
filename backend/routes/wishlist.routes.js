import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addToWishlist,
  removeFromWishlist,
  allWishlistItems,
} from "../controllers/wishlist.controller.js";

const router = express.Router();

router.post("/add", verifyJWT, addToWishlist);
router.delete("/remove", verifyJWT, removeFromWishlist);
router.get("/all", verifyJWT, allWishlistItems);

export default router;
