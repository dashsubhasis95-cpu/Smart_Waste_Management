// models/SmartBin.js

import mongoose from "mongoose";

const smartBinSchema = new mongoose.Schema(
  {
    binId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    location: {
      lat: {
        type: Number,
        required: true,
      },

      lng: {
        type: Number,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },
    },

    fillLevel: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 0,
    },

    wasteType: {
      type: String,
      enum: [
        "Plastic",
        "Metal",
        "Glass",
        "Paper",
        "Organic",
        "E-Waste",
        "Hazardous",
      ],
      default: "Organic",
    },

    status: {
      type: String,
      enum: [
        "Empty",
        "Moderate",
        "Full",
        "Critical",
      ],
      default: "Empty",
    },

    temperature: {
      type: Number,
      default: 25,
    },

    odorLevel: {
      type: Number,
      default: 0,
    },

    batteryLevel: {
      type: Number,
      default: 100,
    },

    predictedOverflowTime: {
      type: Date,
    },

    lastCollectedAt: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    sensorStatus: {
      type: String,
      enum: ["Online", "Offline", "Maintenance"],
      default: "Online",
    },
  },
  {
    timestamps: true,
  }
);

const SmartBin = mongoose.model(
  "SmartBin",
  smartBinSchema
);

export default SmartBin;