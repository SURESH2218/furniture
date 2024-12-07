import {
  createUser,
  findUserByEmail,
  generateAccessToken,
  generateRefreshToken,
  updateRefreshToken,
  validUser,
} from "../models/User.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const userRegister = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw ApiError(400, "Email is already taken");
    }

    const newUser = await createUser(email, password, name);

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    return res.status(201).json(
      ApiResponse(201, {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
        accessToken,
        refreshToken,
      })
    );
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors || [],
      });
    }
    console.log("Unexpected error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
});

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await validUser(email, password);

    if (!findUser) {
      throw ApiError(401, "Invalid credentials");
    }

    const accessToken = generateAccessToken(findUser);
    const refreshToken = generateRefreshToken(findUser);

    await updateRefreshToken(email, refreshToken);

    res.status(200).json(
      ApiResponse(200, {
        user: {
          id: findUser.id,
          email: findUser.email,
          name: findUser.name,
          role: findUser.role,
        },
        accessToken,
        refreshToken,
      })
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
});

export default userRegister;
