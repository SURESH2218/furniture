import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import prisma from "../prisma/client.js";
import stripe from "../utils/stripe.config.js";

export const orderController = asyncHandler(async (req, res) => {
  const { userId, items, shippingAddress, paymentMethod } = req.body;

  if (!userId || !items || items.length === 0) {
    throw ApiError(400, "Order items and user ID are required");
  }

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalPrice * 100),
    currency: "INR",
    metadata: { userId },
  });

  const newOrder = await prisma.order.create({
    data: {
      userId,
      shippingAddress,
      paymentMethod,
      totalPrice,
      status: "PENDING",
      transactionId: paymentIntent.id,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: { items: true },
  });

  return res.status(201).json(
    ApiResponse(
      201,
      {
        orderId: newOrder.id,
        paymentIntentClientSecret: paymentIntent.client_secret,
      },
      "Order placed successfully and payment intent created."
    )
  );
});

export const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { orderId } = req.params;

  console.log(status, orderId);

  const validStatuses = [
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];
  if (!validStatuses.includes(status)) {
    throw ApiError(400, "Invalid status value");
  }

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  return res
    .status(200)
    .json(ApiResponse(200, updatedOrder, "Order status updated"));
});

export const orderHistory = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });

    if (orders.length === 0) {
      return res.status(200).json("No Orders...");
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
    });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
