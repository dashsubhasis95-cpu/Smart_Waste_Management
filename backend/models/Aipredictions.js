// models/AIPrediction.js

import mongoose from "mongoose";

const aiPredictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    wasteDepositId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WasteDeposit",
    },

    imageUrl: {
      type: String,
      required: true,
    },

    predictedType: {
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

    confidenceScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    disposalSuggestion: {
      type: String,
      required: true,
    },

    recyclable: {
      type: Boolean,
      default: true,
    },

    carbonImpact: {
      type: Number,
      default: 0,
    },

    aiModelVersion: {
      type: String,
      default: "v1.0",
    },

    processingTime: {
      type: Number,
    },

    predictionStatus: {
      type: String,
      enum: [
        "Processing",
        "Completed",
        "Failed",
      ],
      default: "Completed",
    },
  },
  {
    timestamps: true,
  }
);

const AIPrediction = mongoose.model(
  "AIPrediction",
  aiPredictionSchema
);

export default AIPrediction;