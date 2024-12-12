import {
  createUser,
  findUserByEmail,
  generateAccessToken,
  generateRefreshToken,
  isPasswordValid,
  updateRefreshToken,
  validUser,
} from "../models/User.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import prisma from "../prisma/client.js";

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

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
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

    await updateRefreshToken(findUser.email, refreshToken);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
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

export const logoutUser = asyncHandler(async (req, res) => {
  try {
    await updateRefreshToken(req.user.email, null);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    return res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json(ApiResponse(200, {}, "User logged out successfully"));
  } catch (error) {
    console.error("Logout error:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
});

export const updateProfile = asyncHandler(async (req, res) => {
  try {
    const { phone, address, city, state, country, postalCode } = req.body;
    const existingProfile = await prisma.profile.findUnique({
      where: {
        userId: req.user.id,
      },
    });
    const updateData = Object.fromEntries(
      Object.entries({
        phone,
        address,
        city,
        state,
        country,
        postalCode,
      }).filter(([_, value]) => value !== undefined && value !== null)
    );

    if (existingProfile) {
      const updatedProfile = await prisma.profile.update({
        where: { userId: req.user.id },
        data: updateData,
      });

      return res
        .status(200)
        .json(ApiResponse(200, updatedProfile, "Profile updated successfully"));
    } else {
      const newProfile = await prisma.profile.create({
        data: { userId: req.user.id, ...updateData },
      });

      return res
        .status(201)
        .json(ApiResponse(200, newProfile, "Profile created Successfully"));
    }
  } catch (error) {
    throw ApiError(500, `Error updating profile: ${error.message}`);
  }
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { user } = req;

  if (!currentPassword || !newPassword) {
    throw ApiError(400, "Both current password and new password are required");
  }

  const existingUser = await findUserByEmail(user.email);

  if (!existingUser) {
    throw ApiError(404, "User not found");
  }

  const isMatch = await isPasswordValid(currentPassword, existingUser.password);
  if (!isMatch) {
    throw ApiError(401, "Current password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await updatePassword(user.email, hashedPassword);

  return res
    .status(200)
    .json(ApiResponse(200, {}, "Password Updated Successfully"));
});

export const updatePassword = async (email, hashedPassword) => {
  try {
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
  } catch (error) {
    throw new Error(`Error updating password: ${error.message}`);
  }
};

export const getUserDetails = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const userDetails = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profile: user.profile,
      reviews: user.reviews,
      wishlist: user.wishlist,
      orders: user.orders,
    };

    if (!userDetails) {
      throw ApiError(404, "User not found");
    }

    return res
      .status(200)
      .json(ApiResponse(200, userDetails, "User Details Fetched Successfully"));
  } catch (error) {
    throw ApiError(401, "Unauthorized");
  }
});

export default userRegister;
