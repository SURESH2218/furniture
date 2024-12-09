import bcrypt from "bcrypt";
import prisma from "../prisma/client.js";

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
      return next(
        new ApiError(403, "Access denied. Insufficient permissions.")
      );
    }
    next();
  };
};

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    const customers = await users.filter(
      (customer) => customer.role !== "ADMIN"
    );
    // console.log(customers);
    return customers;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};
