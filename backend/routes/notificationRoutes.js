// routes/notificationRoutes.js

import express from "express";

import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
  createNotification,
} from "../controllers/notificationController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getNotifications
);

router.post(
  "/",
  protect,
  adminOnly,
  createNotification
);

router.put(
  "/:id/read",
  protect,
  markNotificationAsRead
);

router.delete(
  "/:id",
  protect,
  deleteNotification
);

export default router;