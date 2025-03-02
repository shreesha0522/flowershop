// controller/notificationController.js
import { Notification } from '../models/Notification.js'

const getByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const notification = await Notification.findOne({ where: { userId } });
    if (!notification) {
      return res.status(404).send({ message: "Notification preferences not found" });
    }
    res.status(200).send({ data: notification, message: "Fetched successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch notification preferences" });
  }
};

const updateByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { email, orders, promotions, updates } = req.body;
    let notification = await Notification.findOne({ where: { userId } });
    if (!notification) {
      // Create if not exists
      notification = await Notification.create({
        userId,
        email,
        orders,
        promotions,
        updates,
      });
      return res.status(201).send({ data: notification, message: "Created notification preferences" });
    }
    // Update existing record
    notification.email = email;
    notification.orders = orders;
    notification.promotions = promotions;
    notification.updates = updates;
    await notification.save();
    res.status(200).send({ data: notification, message: "Updated notification preferences successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to update notification preferences" });
  }
};

export const notificationController = {
  getByUserId,
  updateByUserId,
};
