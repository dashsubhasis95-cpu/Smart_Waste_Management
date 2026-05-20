// controllers/notificationController.js

import Notification from "../models/Notification.js";

import User from "../models/User.js";

/*
    GET USER NOTIFICATIONS
*/

export const getNotifications =
  async (req, res) => {
    try {
      const notifications =
        await Notification.find({
          $or: [
            {
              userId: req.user.id,
            },

            {
              userId: null,
            },
          ],
        }).sort({
          createdAt: -1,
        });

      /*
          UNREAD COUNT
      */

      const unreadCount =
        await Notification.countDocuments(
          {
            $or: [
              {
                userId:
                  req.user.id,
              },

              {
                userId: null,
              },
            ],

            isRead: false,
          }
        );

      res.status(200).json({
        success: true,

        totalNotifications:
          notifications.length,

        unreadCount,

        notifications,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    CREATE NOTIFICATION
*/

export const createNotification =
  async (req, res) => {
    try {
      const {
        userId,
        title,
        message,
        notificationType,
        priority,
        actionLink,
        expiresAt,
      } = req.body;

      /*
          CREATE NOTIFICATION
      */

      const notification =
        await Notification.create({
          userId,

          title,

          message,

          notificationType,

          priority,

          actionLink,

          expiresAt,
        });

      /*
          REALTIME SOCKET EVENT
      */

      // io.emit("newNotification", notification);

      res.status(201).json({
        success: true,

        message:
          "Notification created successfully",

        notification,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    MARK NOTIFICATION AS READ
*/

export const markNotificationAsRead =
  async (req, res) => {
    try {
      const notification =
        await Notification.findById(
          req.params.id
        );

      if (!notification) {
        return res.status(404).json({
          success: false,

          message:
            "Notification not found",
        });
      }

      /*
          SECURITY CHECK
      */

      if (
        notification.userId &&
        notification.userId.toString() !==
          req.user.id
      ) {
        return res.status(403).json({
          success: false,

          message:
            "Unauthorized access",
        });
      }

      notification.isRead = true;

      await notification.save();

      res.status(200).json({
        success: true,

        message:
          "Notification marked as read",

        notification,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    DELETE NOTIFICATION
*/

export const deleteNotification =
  async (req, res) => {
    try {
      const notification =
        await Notification.findById(
          req.params.id
        );

      if (!notification) {
        return res.status(404).json({
          success: false,

          message:
            "Notification not found",
        });
      }

      /*
          SECURITY CHECK
      */

      if (
        notification.userId &&
        notification.userId.toString() !==
          req.user.id
      ) {
        return res.status(403).json({
          success: false,

          message:
            "Unauthorized access",
        });
      }

      await notification.deleteOne();

      res.status(200).json({
        success: true,

        message:
          "Notification deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };