// controllers/rewardController.js

import Reward from "../models/Reward.js";

import User from "../models/User.js";

import WasteDeposit from "../models/WasteDeposit.js";

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

      /*
          TOTAL POINTS
      */

      const totalPoints =
        rewards.reduce(
          (acc, reward) =>
            acc + reward.pointsEarned,
          0
        );

      /*
          TOTAL CARBON SAVED
      */

      const totalCarbonSaved =
        rewards.reduce(
          (acc, reward) =>
            acc + reward.carbonSaved,
          0
        );

      res.status(200).json({
        success: true,

        totalRewards:
          rewards.length,

        totalPoints,

        totalCarbonSaved,

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
    ADD REWARD POINTS
*/

export const addRewardPoints =
  async (req, res) => {
    try {
      const {
        userId,
        rewardType,
        pointsEarned,
        description,
        carbonSaved,
      } = req.body;

      /*
          FIND USER
      */

      const user =
        await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      /*
          CREATE REWARD
      */

      const reward =
        await Reward.create({
          userId,

          rewardType,

          pointsEarned,

          description,

          carbonSaved,
        });

      /*
          UPDATE USER ECO POINTS
      */

      user.ecoPoints += pointsEarned;

      user.carbonSaved +=
        carbonSaved || 0;

      await user.save();

      /*
          GAMIFICATION BADGES
      */

      if (
        user.ecoPoints >= 500 &&
        !user.badges.includes(
          "Eco Warrior"
        )
      ) {
        user.badges.push(
          "Eco Warrior"
        );
      }

      if (
        user.ecoPoints >= 1000 &&
        !user.badges.includes(
          "Recycling Champion"
        )
      ) {
        user.badges.push(
          "Recycling Champion"
        );
      }

      await user.save();

      res.status(201).json({
        success: true,

        message:
          "Reward points added successfully",

        reward,

        updatedEcoPoints:
          user.ecoPoints,

        badges: user.badges,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    REDEEM REWARD
*/

export const redeemReward =
  async (req, res) => {
    try {
      const reward =
        await Reward.findById(
          req.params.id
        );

      if (!reward) {
        return res.status(404).json({
          success: false,
          message:
            "Reward not found",
        });
      }

      /*
          ONLY OWNER CAN REDEEM
      */

      if (
        reward.userId.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Unauthorized access",
        });
      }

      /*
          REDEEM REWARD
      */

      reward.rewardStatus =
        "Redeemed";

      reward.redeemedAt =
        new Date();

      await reward.save();

      res.status(200).json({
        success: true,

        message:
          "Reward redeemed successfully",

        reward,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    ECO LEADERBOARD
*/

export const getLeaderboard =
  async (req, res) => {
    try {
      const leaderboard =
        await User.find()
          .select(
            "name ecoPoints carbonSaved badges profileImage"
          )
          .sort({
            ecoPoints: -1,
          })
          .limit(20);

      /*
          RANK ASSIGNMENT
      */

      const rankedUsers =
        leaderboard.map(
          (user, index) => ({
            rank: index + 1,

            user,
          })
        );

      res.status(200).json({
        success: true,

        leaderboard:
          rankedUsers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    GET REWARD HISTORY
*/

export const getRewardHistory =
  async (req, res) => {
    try {
      const rewardHistory =
        await Reward.find({
          userId: req.user.id,
        }).sort({
          createdAt: -1,
        });

      /*
          MONTHLY REWARD ANALYTICS
      */

      const monthlyAnalytics =
        await Reward.aggregate([
          {
            $match: {
              userId: req.user._id,
            },
          },

          {
            $group: {
              _id: {
                month: {
                  $month:
                    "$createdAt",
                },

                year: {
                  $year:
                    "$createdAt",
                },
              },

              totalPoints: {
                $sum:
                  "$pointsEarned",
              },

              rewardsCount: {
                $sum: 1,
              },
            },
          },
        ]);

      res.status(200).json({
        success: true,

        rewardHistory,

        monthlyAnalytics,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    DELETE REWARD
*/

export const deleteReward =
  async (req, res) => {
    try {
      const reward =
        await Reward.findById(
          req.params.id
        );

      if (!reward) {
        return res.status(404).json({
          success: false,
          message:
            "Reward not found",
        });
      }

      await reward.deleteOne();

      res.status(200).json({
        success: true,

        message:
          "Reward deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };