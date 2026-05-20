// controllers/wasteController.js

import WasteDeposit from "../models/WasteDeposit.js";

import Reward from "../models/Reward.js";

import User from "../models/User.js";

import SmartBin from "../models/SmartBin.js";

import axios from "axios";

/*
    CREATE WASTE DEPOSIT
    AI + IoT + Reward System
*/

export const createWasteDeposit =
  async (req, res) => {
    try {
      const {
        binId,
        weight,
        imageUrl,
        location,
      } = req.body;

      /*
          FIND SMART BIN
      */

      const bin =
        await SmartBin.findById(binId);

      if (!bin) {
        return res.status(404).json({
          success: false,
          message: "Smart bin not found",
        });
      }

      /*
          SEND IMAGE TO AI SERVICE
      */

      const aiResponse =
        await axios.post(
          "http://localhost:8000/classify-waste",
          {
            imageUrl,
          }
        );

      /*
          AI RESPONSE
      */

      const predictedWasteType =
        aiResponse.data.wasteType;

      const confidenceScore =
        aiResponse.data.confidence;

      const disposalSuggestion =
        aiResponse.data.suggestion;

      /*
          REWARD CALCULATION
      */

      let rewardPoints = 0;

      if (
        predictedWasteType === "Plastic"
      ) {
        rewardPoints = 15;
      } else if (
        predictedWasteType === "E-Waste"
      ) {
        rewardPoints = 25;
      } else {
        rewardPoints = 10;
      }

      /*
          CREATE WASTE DEPOSIT
      */

      const wasteDeposit =
        await WasteDeposit.create({
          userId: req.user.id,

          binId,

          wasteType:
            predictedWasteType,

          weight,

          imageUrl,

          aiPrediction:
            predictedWasteType,

          confidenceScore,

          disposalSuggestion,

          rewardPoints,

          location,

          verified:
            confidenceScore >= 80,
        });

      /*
          UPDATE USER STATS
      */

      const user =
        await User.findById(
          req.user.id
        );

      user.ecoPoints += rewardPoints;

      user.totalWasteDeposited +=
        weight;

      user.carbonSaved +=
        weight * 0.7;

      await user.save();

      /*
          CREATE REWARD RECORD
      */

      await Reward.create({
        userId: req.user.id,

        rewardType: "Recycling",

        pointsEarned: rewardPoints,

        description:
          `${predictedWasteType} recycled successfully`,

        carbonSaved:
          weight * 0.7,
      });

      /*
          UPDATE SMART BIN
      */

      bin.fillLevel +=
        weight * 0.5;

      await bin.save();

      /*
          RETURN RESPONSE
      */

      res.status(201).json({
        success: true,

        message:
          "Waste deposited successfully",

        aiPrediction: {
          wasteType:
            predictedWasteType,

          confidence:
            confidenceScore,

          suggestion:
            disposalSuggestion,
        },

        rewardPoints,

        wasteDeposit,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    GET ALL WASTE DEPOSITS
*/

export const getAllWasteDeposits =
  async (req, res) => {
    try {
      const wasteDeposits =
        await WasteDeposit.find()
          .populate(
            "userId",
            "name email"
          )
          .populate(
            "binId",
            "binId location"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,

        total:
          wasteDeposits.length,

        wasteDeposits,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    GET SINGLE WASTE DEPOSIT
*/

export const getWasteDepositById =
  async (req, res) => {
    try {
      const wasteDeposit =
        await WasteDeposit.findById(
          req.params.id
        )
          .populate(
            "userId",
            "name email"
          )
          .populate(
            "binId",
            "binId"
          );

      if (!wasteDeposit) {
        return res.status(404).json({
          success: false,
          message:
            "Waste deposit not found",
        });
      }

      res.status(200).json({
        success: true,

        wasteDeposit,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    VERIFY WASTE DEPOSIT
*/

export const verifyWasteDeposit =
  async (req, res) => {
    try {
      const wasteDeposit =
        await WasteDeposit.findById(
          req.params.id
        );

      if (!wasteDeposit) {
        return res.status(404).json({
          success: false,
          message:
            "Waste deposit not found",
        });
      }

      wasteDeposit.verified = true;

      await wasteDeposit.save();

      res.status(200).json({
        success: true,

        message:
          "Waste deposit verified",

        wasteDeposit,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    DELETE WASTE DEPOSIT
*/

export const deleteWasteDeposit =
  async (req, res) => {
    try {
      const wasteDeposit =
        await WasteDeposit.findById(
          req.params.id
        );

      if (!wasteDeposit) {
        return res.status(404).json({
          success: false,
          message:
            "Waste deposit not found",
        });
      }

      await wasteDeposit.deleteOne();

      res.status(200).json({
        success: true,

        message:
          "Waste deposit deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    ADVANCED WASTE ANALYTICS
*/

export const getWasteStatistics =
  async (req, res) => {
    try {
      /*
          TOTAL WASTE
      */

      const totalWaste =
        await WasteDeposit.aggregate([
          {
            $group: {
              _id: null,

              totalWeight: {
                $sum: "$weight",
              },
            },
          },
        ]);

      /*
          WASTE TYPE DISTRIBUTION
      */

      const wasteTypeStats =
        await WasteDeposit.aggregate([
          {
            $group: {
              _id: "$wasteType",

              totalDeposits: {
                $sum: 1,
              },

              totalWeight: {
                $sum: "$weight",
              },
            },
          },
        ]);

      /*
          DAILY ANALYTICS
      */

      const dailyAnalytics =
        await WasteDeposit.aggregate([
          {
            $group: {
              _id: {
                $dateToString: {
                  format:
                    "%Y-%m-%d",

                  date: "$createdAt",
                },
              },

              totalDeposits: {
                $sum: 1,
              },

              totalWeight: {
                $sum: "$weight",
              },
            },
          },

          {
            $sort: {
              _id: -1,
            },
          },
        ]);

      /*
          AI PREDICTION ACCURACY
      */

      const verifiedWaste =
        await WasteDeposit.countDocuments(
          {
            verified: true,
          }
        );

      const totalDeposits =
        await WasteDeposit.countDocuments();

      const aiAccuracy =
        totalDeposits > 0
          ? (
              (verifiedWaste /
                totalDeposits) *
              100
            ).toFixed(2)
          : 0;

      res.status(200).json({
        success: true,

        statistics: {
          totalWaste:
            totalWaste[0]
              ?.totalWeight || 0,

          totalDeposits,

          aiAccuracy,

          wasteTypeStats,

          dailyAnalytics,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };