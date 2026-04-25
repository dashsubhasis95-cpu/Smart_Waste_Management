// models/Reward.js

import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rewardType: {
      type: String,
      required: true,
      enum: [
        "Recycling",
        "Daily Streak",
        "Weekly Challenge",
        "Monthly Bonus",
        "Referral",
        "Eco Achievement",
      ],
    },

    pointsEarned: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      required: true,
    },

    badgeAwarded: {
      type: String,
      default: "",
    },

    challengeId: {
      type: String,
    },

    carbonSaved: {
      type: Number,
      default: 0,
    },

    rewardStatus: {
      type: String,
      enum: [
        "Pending",
        "Credited",
        "Redeemed",
      ],
      default: "Credited",
    },

    redeemedAt: {
      type: Date,
    },

    expiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Reward = mongoose.model(
  "Reward",
  rewardSchema
);

export default Reward;