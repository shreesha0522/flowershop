// index.js (backend main file)
import express from "express";
import bodyParser from "body-parser";
import { db } from "./database/index.js";
import { userRouter, authRouter, productRouter, orderRouter } from "./route/index.js";
import dotenv from "dotenv";
import router from "./route/uploadRoutes.js";
import { createUploadsFolder } from "./security/helper.js";
import cors from "cors";
import { notificationRouter } from "./route/notificationRoutes.js";
import { paymentRouter } from "./route/paymentRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/file", router);
app.use("/api/notifications", notificationRouter);
app.use("/api/payments", paymentRouter); // Added payment routes

createUploadsFolder();

app.listen(port, function () {
  console.log(`Project running on port ${port}`);
  db();
});
