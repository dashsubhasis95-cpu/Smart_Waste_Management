// routes/rewardRoutes.js

import express from "express";

import {
  getUserRewards,
  addRewardPoints,
  redeemReward,
  getLeaderboard,
  getRewardHistory,
  deleteReward,
} from "../controllers/rewardController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/*
    @route   GET /api/rewards
*/

router.get(
  "/",
  protect,
  getUserRewards
);

/*
    @route   GET /api/rewards/history
*/

router.get(
  "/history",
  protect,
  getRewardHistory
);

/*
    @route   GET /api/rewards/leaderboard
*/

router.get(
  "/leaderboard",
  getLeaderboard
);

/*
    @route   POST /api/rewards/add
*/

router.post(
  "/add",
  protect,
  adminOnly,
  addRewardPoints
);

/*
    @route   PUT /api/rewards/:id/redeem
*/

router.put(
  "/:id/redeem",
  protect,
  redeemReward
);

/*
    @route   DELETE /api/rewards/:id
*/

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteReward
);

export default router;