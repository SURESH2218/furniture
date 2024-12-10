import express from "express";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadToS3 } from "../utils/UploadToS3.js";
import ApiError from "../utils/ApiError.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/upload", upload.single("image"), async (req, res, next) => {
  try {
    if (!req.file) {
      throw ApiError(400, "No file uploaded");
    }

    const fileUrl = await uploadToS3(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    res.json(ApiResponse(200, { fileUrl }, "Image uploaded successfully"));
  } catch (error) {
    next(error);
  }
});

export default router;
