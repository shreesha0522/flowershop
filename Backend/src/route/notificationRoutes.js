// routes/notificationRoutes.js
import express from "express";
import { notificationController } from "../controller/notificationController.js";
import { authenticateToken } from "../middleware/token-middleware.js";
const router = express.Router();

router.get("/:userId", authenticateToken, notificationController.getByUserId);
router.put("/:userId", authenticateToken, notificationController.updateByUserId);

export { router as notificationRouter };
