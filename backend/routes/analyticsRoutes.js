// routes/analyticsRoutes.js

import express from "express";

import {
  getDailyAnalytics,
  getWeeklyAnalytics,
  getMonthlyAnalytics,
  getWasteTypeDistribution,
  getCarbonImpactStats,
} from "../controllers/analyticsController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/daily",
  protect,
  adminOnly,
  getDailyAnalytics
);

router.get(
  "/weekly",
  protect,
  adminOnly,
  getWeeklyAnalytics
);

router.get(
  "/monthly",
  protect,
  adminOnly,
  getMonthlyAnalytics
);

router.get(
  "/waste-distribution",
  protect,
  adminOnly,
  getWasteTypeDistribution
);

router.get(
  "/carbon-impact",
  protect,
  adminOnly,
  getCarbonImpactStats
);

export default router;