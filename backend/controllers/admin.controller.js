import bcrypt from "bcrypt";
import prisma from "../prisma/client.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const createAdminAccount = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "ADMIN",
      },
    });
    console.log("Admin account created:", admin);
  } catch (error) {
    console.error("Error creating admin account:", error.message);
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(ApiError(403, "Access denied. Insufficient permissions."));
    }
    next();
  };
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    const customers = await users.filter(
      (customer) => customer.role !== "ADMIN"
    );
    // console.log(customers);
    return res.status(200).json(200, customers);
  } catch (error) {
    throw ApiError(500, `Error fetching users: ${error.message}`);
  }
};
