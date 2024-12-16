import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../controllers/admin.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/create-product")
  .post(
    upload.single("image"),
    verifyJWT,
    authorizeRoles("ADMIN"),
    createProduct
  );
router.route("/:id").put(verifyJWT, authorizeRoles("ADMIN"), updateProduct);
router.route("/:id").delete(verifyJWT, authorizeRoles("ADMIN"), deleteProduct);
router.route("/products").get(getAllProducts);
router.route("/:id").get(getProductDetails);

export default router;
