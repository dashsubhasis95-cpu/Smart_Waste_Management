// models/Complaint.js

import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    complaintType: {
      type: String,
      enum: [
        "Overflowing Bin",
        "Missed Collection",
        "Illegal Dumping",
        "Damaged Bin",
        "Bad Odor",
        "Other",
      ],
      required: true,
    },

    imageUrl: {
      type: String,
      default: "",
    },

    location: {
      lat: Number,
      lng: Number,
      address: String,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Resolved",
        "Rejected",
      ],
      default: "Pending",
    },

    assignedWorker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    resolvedAt: {
      type: Date,
    },

    adminRemarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model(
  "Complaint",
  complaintSchema
);

export default Complaint;