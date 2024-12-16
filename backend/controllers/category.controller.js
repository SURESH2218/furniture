import prisma from "../prisma/client.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    throw ApiError(500, "Name and description are required");
  }

  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    return res
      .status(201)
      .json(ApiResponse(200, newCategory, "New category created Successfully"));
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error creating category: ${error.message}` });
  }
});

export const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    return res
      .status(200)
      .json(ApiResponse(200, categories, "categories fetched successfully"));
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error fetching categories: ${error.message}` });
  }
});
