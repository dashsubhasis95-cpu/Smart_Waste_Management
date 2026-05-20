// controllers/analyticsController.js

import WasteDeposit from "../models/WasteDeposit.js";

import User from "../models/User.js";

import SmartBin from "../models/SmartBin.js";

import Reward from "../models/Reward.js";

import Complaint from "../models/Complaint.js";

/*
    DAILY ANALYTICS
*/

export const getDailyAnalytics =
  async (req, res) => {
    try {
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

              totalWasteCollected: {
                $sum: "$weight",
              },

              totalDeposits: {
                $sum: 1,
              },

              averageWeight: {
                $avg: "$weight",
              },
            },
          },

          {
            $sort: {
              _id: -1,
            },
          },
        ]);

      res.status(200).json({
        success: true,

        dailyAnalytics,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    WEEKLY ANALYTICS
*/

export const getWeeklyAnalytics =
  async (req, res) => {
    try {
      const weeklyAnalytics =
        await WasteDeposit.aggregate([
          {
            $group: {
              _id: {
                week: {
                  $week:
                    "$createdAt",
                },

                year: {
                  $year:
                    "$createdAt",
                },
              },

              totalWasteCollected: {
                $sum: "$weight",
              },

              totalDeposits: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              "_id.year": -1,

              "_id.week": -1,
            },
          },
        ]);

      res.status(200).json({
        success: true,

        weeklyAnalytics,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    MONTHLY ANALYTICS
*/

export const getMonthlyAnalytics =
  async (req, res) => {
    try {
      const monthlyAnalytics =
        await WasteDeposit.aggregate([
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

              totalWasteCollected: {
                $sum: "$weight",
              },

              totalDeposits: {
                $sum: 1,
              },

              totalCarbonSaved: {
                $sum: {
                  $multiply: [
                    "$weight",
                    0.7,
                  ],
                },
              },
            },
          },

          {
            $sort: {
              "_id.year": -1,

              "_id.month": -1,
            },
          },
        ]);

      res.status(200).json({
        success: true,

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
    WASTE TYPE DISTRIBUTION
*/

export const getWasteTypeDistribution =
  async (req, res) => {
    try {
      const distribution =
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

          {
            $sort: {
              totalWeight: -1,
            },
          },
        ]);

      res.status(200).json({
        success: true,

        distribution,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    CARBON IMPACT ANALYTICS
*/

export const getCarbonImpactStats =
  async (req, res) => {
    try {
      /*
          TOTAL CARBON SAVED
      */

      const totalCarbon =
        await Reward.aggregate([
          {
            $group: {
              _id: null,

              totalCarbonSaved: {
                $sum:
                  "$carbonSaved",
              },
            },
          },
        ]);

      /*
          TOP ECO USERS
      */

      const topEcoUsers =
        await User.find()
          .select(
            "name carbonSaved ecoPoints"
          )
          .sort({
            carbonSaved: -1,
          })
          .limit(10);

      /*
          WASTE REDUCTION TREND
      */

      const reductionTrend =
        await WasteDeposit.aggregate([
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

              totalWaste: {
                $sum: "$weight",
              },
            },
          },

          {
            $sort: {
              "_id.year": 1,

              "_id.month": 1,
            },
          },
        ]);

      res.status(200).json({
        success: true,

        analytics: {
          totalCarbonSaved:
            totalCarbon[0]
              ?.totalCarbonSaved ||
            0,

          topEcoUsers,

          reductionTrend,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };