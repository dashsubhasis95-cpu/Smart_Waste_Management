// controllers/userController.js

import User from "../models/User.js";

import WasteDeposit from "../models/WasteDeposit.js";

import Reward from "../models/Reward.js";

import Complaint from "../models/Complaint.js";

/*
    GET USER PROFILE
*/

export const getUserProfile =
  async (req, res) => {
    try {
      const user = await User.findById(
        req.user.id
      ).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      /*
          USER ANALYTICS
      */

      const totalDeposits =
        await WasteDeposit.countDocuments({
          userId: req.user.id,
        });

      const totalRewards =
        await Reward.aggregate([
          {
            $match: {
              userId: user._id,
            },
          },

          {
            $group: {
              _id: null,

              totalPoints: {
                $sum: "$pointsEarned",
              },
            },
          },
        ]);

      const recentComplaints =
        await Complaint.find({
          userId: req.user.id,
        })
          .sort({ createdAt: -1 })
          .limit(5);

      res.status(200).json({
        success: true,

        user,

        analytics: {
          totalDeposits,

          ecoPoints:
            totalRewards[0]?.totalPoints ||
            0,

          recyclingStreak:
            user.recyclingStreak,

          carbonSaved:
            user.carbonSaved,
        },

        recentComplaints,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    UPDATE USER PROFILE
*/

export const updateUserProfile =
  async (req, res) => {
    try {
      const {
        name,
        phone,
        address,
        profileImage,
      } = req.body;

      const user = await User.findById(
        req.user.id
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      /*
          UPDATE FIELDS
      */

      user.name = name || user.name;

      user.phone = phone || user.phone;

      user.address =
        address || user.address;

      user.profileImage =
        profileImage ||
        user.profileImage;

      await user.save();

      res.status(200).json({
        success: true,

        message:
          "Profile updated successfully",

        user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    GET ECO LEADERBOARD
*/

export const getLeaderboard =
  async (req, res) => {
    try {
      const leaderboard =
        await User.find()
          .select(
            "name ecoPoints carbonSaved profileImage"
          )
          .sort({
            ecoPoints: -1,
          })
          .limit(10);

      res.status(200).json({
        success: true,

        leaderboard,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    GET USER REWARDS
*/

export const getUserRewards =
  async (req, res) => {
    try {
      const rewards = await Reward.find({
        userId: req.user.id,
      }).sort({
        createdAt: -1,
      });

      const totalPoints =
        rewards.reduce(
          (acc, reward) =>
            acc + reward.pointsEarned,
          0
        );

      res.status(200).json({
        success: true,

        totalRewards:
          rewards.length,

        totalPoints,

        rewards,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    GET USER WASTE HISTORY
*/

export const getUserWasteHistory =
  async (req, res) => {
    try {
      const wasteHistory =
        await WasteDeposit.find({
          userId: req.user.id,
        })
          .populate(
            "binId",
            "binId location"
          )
          .sort({
            createdAt: -1,
          });

      /*
          WASTE TYPE ANALYTICS
      */

      const wasteAnalytics =
        await WasteDeposit.aggregate([
          {
            $match: {
              userId: user._id,
            },
          },

          {
            $group: {
              _id: "$wasteType",

              totalWeight: {
                $sum: "$weight",
              },

              totalDeposits: {
                $sum: 1,
              },
            },
          },
        ]);

      res.status(200).json({
        success: true,

        totalDeposits:
          wasteHistory.length,

        wasteHistory,

        wasteAnalytics,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };