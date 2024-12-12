import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";
import { generateAccessToken } from "../models/User.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw ApiError(401, "Unauthorized request: No token provided");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decodedToken._id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        refreshToken: true,
        profile: true,
        createdAt: true,
        updatedAt: true,
        reviews: true,
        wishlist: true,
        orders: true,
      },
    });

    if (!user) {
      throw ApiError(401, "Invalid Access Token: User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw ApiError(
      401,
      error?.message || "Invalid Access Token: Token verification failed"
    );
  }
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw ApiError(401, "Refresh token is missing");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded._id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        refreshToken: true,
      },
    });

    if (!user || user.refreshToken !== refreshToken) {
      throw ApiError(401, "Invalid refresh token");
    }

    const newAccessToken = await generateAccessToken(user);
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    return res
      .status(200)
      .cookie("accessToken", newAccessToken, cookieOptions)
      .json(newAccessToken);
  } catch (error) {
    throw ApiError(401, "Failed to refresh access token");
  }
});
