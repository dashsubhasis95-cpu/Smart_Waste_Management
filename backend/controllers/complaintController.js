// controllers/complaintController.js

import Complaint from "../models/Complaint.js";

import User from "../models/User.js";

import SmartBin from "../models/SmartBin.js";

import Notification from "../models/Notification.js";

import axios from "axios";

/*
    CREATE COMPLAINT
    AI + LOCATION + PRIORITY DETECTION
*/

export const createComplaint =
  async (req, res) => {
    try {
      const {
        title,
        description,
        complaintType,
        imageUrl,
        location,
      } = req.body;

      /*
          AI PRIORITY ANALYSIS
      */

      let aiPriority = "Medium";

      /*
          OPTIONAL AI ANALYSIS
      */

      if (imageUrl) {
        try {
          const aiResponse =
            await axios.post(
              "http://localhost:8000/analyze-complaint",
              {
                imageUrl,
                description,
              }
            );

          aiPriority =
            aiResponse.data.priority;
        } catch (err) {
          console.log(
            "AI service unavailable"
          );
        }
      }

      /*
          CREATE COMPLAINT
      */

      const complaint =
        await Complaint.create({
          userId: req.user.id,

          title,

          description,

          complaintType,

          imageUrl,

          location,

          priority: aiPriority,
        });

      /*
          CREATE ADMIN NOTIFICATION
      */

      await Notification.create({
        title:
          "New Complaint Submitted",

        message: `${complaintType} complaint created`,

        notificationType:
          "System Notification",

        priority: aiPriority,
      });

      res.status(201).json({
        success: true,

        message:
          "Complaint created successfully",

        complaint,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    GET ALL COMPLAINTS
*/

export const getAllComplaints =
  async (req, res) => {
    try {
      const complaints =
        await Complaint.find()
          .populate(
            "userId",
            "name email"
          )
          .populate(
            "assignedWorker",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      /*
          COMPLAINT ANALYTICS
      */

      const analytics =
        await Complaint.aggregate([
          {
            $group: {
              _id: "$status",

              totalComplaints: {
                $sum: 1,
              },
            },
          },
        ]);

      res.status(200).json({
        success: true,

        totalComplaints:
          complaints.length,

        complaints,

        analytics,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    GET SINGLE COMPLAINT
*/

export const getComplaintById =
  async (req, res) => {
    try {
      const complaint =
        await Complaint.findById(
          req.params.id
        )
          .populate(
            "userId",
            "name email"
          )
          .populate(
            "assignedWorker",
            "name email"
          );

      if (!complaint) {
        return res.status(404).json({
          success: false,

          message:
            "Complaint not found",
        });
      }

      res.status(200).json({
        success: true,

        complaint,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    UPDATE COMPLAINT STATUS
*/

export const updateComplaintStatus =
  async (req, res) => {
    try {
      const {
        status,
        adminRemarks,
        assignedWorker,
      } = req.body;

      const complaint =
        await Complaint.findById(
          req.params.id
        );

      if (!complaint) {
        return res.status(404).json({
          success: false,

          message:
            "Complaint not found",
        });
      }

      /*
          UPDATE STATUS
      */

      complaint.status =
        status || complaint.status;

      complaint.adminRemarks =
        adminRemarks ||
        complaint.adminRemarks;

      /*
          ASSIGN WORKER
      */

      if (assignedWorker) {
        complaint.assignedWorker =
          assignedWorker;
      }

      /*
          RESOLUTION TIME
      */

      if (status === "Resolved") {
        complaint.resolvedAt =
          new Date();
      }

      await complaint.save();

      /*
          SEND USER NOTIFICATION
      */

      await Notification.create({
        userId:
          complaint.userId,

        title:
          "Complaint Status Updated",

        message: `Your complaint status changed to ${status}`,

        notificationType:
          "System Notification",

        priority:
          complaint.priority,
      });

      res.status(200).json({
        success: true,

        message:
          "Complaint updated successfully",

        complaint,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    DELETE COMPLAINT
*/

export const deleteComplaint =
  async (req, res) => {
    try {
      const complaint =
        await Complaint.findById(
          req.params.id
        );

      if (!complaint) {
        return res.status(404).json({
          success: false,

          message:
            "Complaint not found",
        });
      }

      await complaint.deleteOne();

      res.status(200).json({
        success: true,

        message:
          "Complaint deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };