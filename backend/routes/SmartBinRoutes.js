// routes/smartBinRoutes.js

import express from "express";

import {
  getAllBins,
  getBinById,
  createSmartBin,
  updateBinFillLevel,
  updateBinStatus,
  deleteSmartBin,
  getNearbyBins,
} from "../controllers/smartBinController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/*
    @route   GET /api/bins
*/

router.get("/", protect, getAllBins);

/*
    @route   GET /api/bins/nearby
*/

router.get("/nearby", protect, getNearbyBins);

/*
    @route   GET /api/bins/:id
*/

router.get("/:id", protect, getBinById);

/*
    @route   POST /api/bins
*/

router.post(
  "/",
  protect,
  adminOnly,
  createSmartBin
);

/*
    @route   PUT /api/bins/:id/fill-level
*/

router.put(
  "/:id/fill-level",
  protect,
  updateBinFillLevel
);

/*
    @route   PUT /api/bins/:id/status
*/

router.put(
  "/:id/status",
  protect,
  adminOnly,
  updateBinStatus
);

/*
    @route   DELETE /api/bins/:id
*/

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteSmartBin
);

export default router;