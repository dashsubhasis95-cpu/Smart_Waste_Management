// models/Notification.js

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    notificationType: {
      type: String,
      enum: [
        "Overflow Alert",
        "Reward Update",
        "Pickup Reminder",
        "Emergency Alert",
        "System Notification",
      ],
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    actionLink: {
      type: String,
    },

    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

export default Notification;