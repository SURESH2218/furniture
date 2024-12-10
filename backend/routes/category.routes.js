import { Router } from "express";

const router = Router();

router.route("/create-category").post(createCategory)
