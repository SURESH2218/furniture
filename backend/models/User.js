import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const isPasswordValid = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error("Error comparing passwords: " + error.message);
  }
};

export const createUser = async (email, password, name) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "CUSTOMER",
        refreshToken: generateRefreshToken({ email, name }),
      },
    });
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const findUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    throw new Error(`Error finding user by email: ${error.message}`);
  }
};

export const updateRefreshToken = async (email, refreshToken) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { refreshToken },
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Error while updating the refreshToken" + error.message);
  }
};

export const validUser = async (email, password) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    // console.log(user);

    if (!user) {
      return null;
    }

    const isPasswordValidResult = await isPasswordValid(
      password,
      user.password
    );

    if (!isPasswordValidResult) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error finding user or validating password:", error);
    throw new Error("Error during user validation.");
  }
};

const generateAccessToken = (user) => {
  try {
    return jwt.sign(
      {
        _id: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
  } catch (error) {
    throw new Error(`Error generating access token: ${error.message}`);
  }
};

const generateRefreshToken = (user) => {
  try {
    return jwt.sign(
      {
        _id: user.id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
  } catch (error) {
    throw new Error(`Error generating refresh token: ${error.message}`);
  }
};

export { generateAccessToken, generateRefreshToken };
