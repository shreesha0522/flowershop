// models/Notification.js
import { DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";

export const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  orders: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  promotions: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  updates: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
