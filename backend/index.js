import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "process.env.CORS_ORIGIN",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Wood Furniture Backend Running" });
});

import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
// import uploadImage from "./routes/imageupload.routes.js";
import productsRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import orderRouter from "./routes/order.routes.js";

app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use("/product", productsRouter);
app.use("/category", categoryRouter);
app.use("/wishlist", wishlistRouter);
app.use("/api", orderRouter);
// app.use("/image", uploadImage);

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Successfully connected to the PostgreSQL database");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("PostgreSQL connection failed", error);
  }
};

connectDB();
