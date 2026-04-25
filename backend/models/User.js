// models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["citizen", "admin", "worker"],
      default: "citizen",
    },

    phone: {
      type: String,
    },

    profileImage: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    ecoPoints: {
      type: Number,
      default: 0,
    },

    recyclingStreak: {
      type: Number,
      default: 0,
    },

    totalWasteDeposited: {
      type: Number,
      default: 0,
    },

    carbonSaved: {
      type: Number,
      default: 0,
    },

    badges: [
      {
        type: String,
      },
    ],

    achievements: [
      {
        title: String,
        earnedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;