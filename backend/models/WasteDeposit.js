// models/WasteDeposit.js

import mongoose from "mongoose";

const wasteDepositSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    binId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SmartBin",
      required: true,
    },

    wasteType: {
      type: String,
      required: true,
      enum: [
        "Plastic",
        "Metal",
        "Glass",
        "Paper",
        "Organic",
        "E-Waste",
        "Hazardous",
      ],
    },

    weight: {
      type: Number,
      required: true,
    },

    imageUrl: {
      type: String,
      default: "",
    },

    aiPrediction: {
      type: String,
    },

    confidenceScore: {
      type: Number,
    },

    disposalSuggestion: {
      type: String,
    },

    rewardPoints: {
      type: Number,
      default: 0,
    },

    depositMethod: {
      type: String,
      enum: [
        "Smart Bin",
        "Manual Collection",
        "Pickup Request",
      ],
      default: "Smart Bin",
    },

    location: {
      lat: Number,
      lng: Number,
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const WasteDeposit = mongoose.model(
  "WasteDeposit",
  wasteDepositSchema
);

export default WasteDeposit;