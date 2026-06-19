// routes/aiRoutes.js

import express from "express";

import {
  classifyWaste,
  getPredictionHistory,
  getPredictionById,
  deletePrediction,
  getAIAnalytics,
} from "../controllers/aiController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/*
    @route   POST /api/ai/classify
*/

router.post(
  "/classify",
  protect,
  upload.single("image"),
  classifyWaste
);

/*
    @route   GET /api/ai/history
*/

router.get(
  "/history",
  protect,
  getPredictionHistory
);

/*
    @route   GET /api/ai/analytics
*/

router.get(
  "/analytics",
  protect,
  adminOnly,
  getAIAnalytics
);

/*
    @route   GET /api/ai/:id
*/

router.get(
  "/:id",
  protect,
  getPredictionById
);

/*
    @route   DELETE /api/ai/:id
*/

router.delete(
  "/:id",
  protect,
  adminOnly,
  deletePrediction
);

export default router;