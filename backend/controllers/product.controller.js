import prisma from "../prisma/client.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadToS3 } from "../utils/UploadToS3.js";

export const createProduct = asyncHandler(async (req, res) => {
  // console.log(req.file);

  const { name, description, price, stockQuantity, categoryId } = req.body;
  // console.log(name);

  if (!req.file) {
    throw ApiError(400, "Product image is required");
  }

  if (!name || !description || !price || !stockQuantity || !categoryId) {
    throw ApiError(400, "All fields are required");
  }

  try {
    const fileUrl = await uploadToS3(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stockQuantity: parseInt(stockQuantity),
        categoryId,
        images: {
          create: {
            imageUrl: fileUrl,
            isPrimary: true,
          },
        },
      },
    });

    return res
      .status(201)
      .json(ApiResponse(200, newProduct, "New product created successfully"));
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error creating product: ${error.message}` });
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stockQuantity, categoryId } = req.body;

  try {
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      throw ApiError(404, "Product not found");
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: name ?? existingProduct.name,
        description: description ?? existingProduct.description,
        price: price !== undefined ? parseFloat(price) : existingProduct.price,
        stockQuantity:
          stockQuantity !== undefined
            ? parseInt(stockQuantity)
            : existingProduct.stockQuantity,
        categoryId: categoryId ?? existingProduct.categoryId,
      },
    });

    return res
      .status(200)
      .json(ApiResponse(200, updatedProduct, "Product updated successfully"));
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error updating product: ${error.message}` });
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw ApiError(404, "Product not found");
    }

    await prisma.product.delete({ where: { id } });
    return res
      .status(200)
      .json(ApiResponse(200, null, "Product deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error deleting product: ${error.message}` });
  }
});

export const getProductDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    if (!product) {
      throw ApiError(404, "Product not found");
    }

    return res
      .status(200)
      .json(ApiResponse(200, {product,id}, "Product details fetched successfully"));
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error fetching product details: ${error.message}` });
  }
});

export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: true,
        reviews: true,
      },
    });
    return res
      .status(200)
      .json(ApiResponse(200, products, "Products fetched successfully"));
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error fetching products: ${error.message}` });
  }
});
