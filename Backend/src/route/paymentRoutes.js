// routes/paymentRoutes.js
import express from "express";
import { paymentController } from "../controller/paymentController.js";


const router = express.Router();

// Create a new payment record
router.post("/",  paymentController.createPayment);

// Get payment history for a user (assuming userId is provided in the URL)
router.get("/:userId",  paymentController.getPaymentsByUser);

// Update payment status (e.g., to mark payment as Delivered)
router.put("/:id", paymentController.updatePaymentStatus);

export { router as paymentRouter };
