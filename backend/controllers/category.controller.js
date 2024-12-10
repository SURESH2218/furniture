import prisma from "@prisma/client";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";

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
