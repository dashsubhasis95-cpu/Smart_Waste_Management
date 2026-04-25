// models/TruckRoute.js

import mongoose from "mongoose";

const truckRouteSchema = new mongoose.Schema(
  {
    truckId: {
      type: String,
      required: true,
      unique: true,
    },

    driverName: {
      type: String,
      required: true,
    },

    driverContact: {
      type: String,
    },

    assignedBins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SmartBin",
      },
    ],

    routeCoordinates: [
      {
        lat: Number,
        lng: Number,
      },
    ],

    optimizedDistance: {
      type: Number,
      default: 0,
    },

    estimatedFuelUsage: {
      type: Number,
      default: 0,
    },

    estimatedCompletionTime: {
      type: Number,
    },

    status: {
      type: String,
      enum: [
        "Idle",
        "Assigned",
        "Collecting",
        "Completed",
      ],
      default: "Idle",
    },

    liveLocation: {
      lat: Number,
      lng: Number,
    },

    routeEfficiencyScore: {
      type: Number,
      default: 0,
    },

    startedAt: Date,

    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

const TruckRoute = mongoose.model(
  "TruckRoute",
  truckRouteSchema
);

export default TruckRoute;