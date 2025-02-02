import express from "express";
import {
  orderController,
  orderHistory,
  updateStatus,
  getAllOrders,
} from "../controllers/order.controller.js";
import stripe from "../utils/stripe.config.js";
import prisma from "../prisma/client.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/placeOrder", verifyJWT, orderController);
router.post(
  "/webhook",
  verifyJWT,
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;

      await prisma.order.updateMany({
        where: { transactionId: paymentIntent.id },
        data: { status: "PROCESSING" },
      });
    }

    res.json({ received: true });
  }
);

router.post(
  "/updateStatus/:orderId",
  verifyJWT,
  authorizeRoles("ADMIN"),
  updateStatus
);
router.get("/order-history/:userId", verifyJWT, orderHistory);
router.get("/getallOrders", verifyJWT, authorizeRoles("ADMIN"), getAllOrders);

export default router;
