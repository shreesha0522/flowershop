// controller/paymentController.js
import { Payment } from "../models/payment.js";

// Create a new payment record
const createPayment = async (req, res) => {
  try {
    const {
      orderId,
      userId,
      date,
      items,
      amount,
      status,
      paymentMethod,
      billingAddress,
    } = req.body;

    if (!orderId || !userId || !items || !amount || !status || !paymentMethod) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const payment = await Payment.create({
      orderId,
      userId,
      date: date || new Date(),
      items,
      amount,
      status,
      paymentMethod,
      billingAddress,
    });

    res.status(201).send({ data: payment, message: "Payment record created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to create payment record" });
  }
};

// Fetch payment history for a given user
const getPaymentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const payments = await Payment.findAll({ where: { userId } });
    res.status(200).send({ data: payments, message: "Fetched payment history successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch payment history" });
  }
};

// Update payment status (e.g., from Processing to Delivered)
const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).send({ message: "Payment not found" });
    }

    payment.status = status;
    await payment.save();

    res.status(200).send({ data: payment, message: "Payment status updated successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to update payment status" });
  }
};

export const paymentController = {
  createPayment,
  getPaymentsByUser,
  updatePaymentStatus,
};
