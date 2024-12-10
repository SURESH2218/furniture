import { Router } from "express";

const router = Router();

router
  .route("/create-product")
  .post(verifyJWT, authorizeRoles("ADMIN"), createProduct);
