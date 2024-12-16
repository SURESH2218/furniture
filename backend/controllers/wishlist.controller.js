import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import prisma from "../prisma/client.js";

export const addToWishlist = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      throw ApiError(400, "Product ID is required");
    }

    const existingWishlistItem = await prisma.wishlistItem.findFirst({
      where: {
        wishlist: { userId },
        productId,
      },
    });

    if (existingWishlistItem) {
      return res
        .status(400)
        .json(ApiResponse(400, {}, "Product is already in wishlist"));
    }

    const wishlist = await prisma.wishlist.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    await prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId,
      },
    });

    return res
      .status(201)
      .json(ApiResponse(200, {}, "Product added to wishlist"));
  } catch (error) {
    console.error("Error adding to wishlist:", error.message);
    return res
      .status(500)
      .json({ error: `Error adding to wishlist: ${error.message}` });
  }
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      throw ApiError(400, "Product ID is required");
    }

    const wishlistItem = await prisma.wishlistItem.findFirst({
      where: {
        wishlist: { userId },
        productId,
      },
    });

    if (!wishlistItem) {
      return res
        .status(400)
        .json(ApiResponse(400, {}, "Product not found in wishlist"));
    }

    await prisma.wishlistItem.delete({
      where: {
        id: wishlistItem.id,
      },
    });

    return res
      .status(200)
      .json(ApiResponse(200, {}, "Product removed from wishlist"));
  } catch (error) {
    console.error("Error removing from wishlist:", error.message);
    return res
      .status(500)
      .json({ error: `Error removing from wishlist: ${error.message}` });
  }
});

export const allWishlistItems = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlistItems = await prisma.wishlistItem.findMany({
      where: {
        wishlist: { userId },
      },
      include: {
        product: true,
      },
    });

    if (wishlistItems.length === 0) {
      return res
        .status(200)
        .json(ApiResponse(200, [], "No products in wishlist"));
    }

    return res
      .status(200)
      .json(ApiResponse(200, wishlistItems, "Wishlist items fetched"));
  } catch (error) {
    console.error("Error fetching wishlist items:", error.message);
    return res
      .status(500)
      .json({ error: `Error fetching wishlist items: ${error.message}` });
  }
});
