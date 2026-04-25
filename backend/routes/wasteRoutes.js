// routes/wasteRoutes.js

import express from "express";

import {
  createWasteDeposit,
  getAllWasteDeposits,
  getWasteDepositById,
  verifyWasteDeposit,
  deleteWasteDeposit,
  getWasteStatistics,
} from "../controllers/wasteController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/*
    @route   POST /api/waste
*/

router.post(
  "/",
  protect,
  createWasteDeposit
);

/*
    @route   GET /api/waste
*/

router.get(
  "/",
  protect,
  adminOnly,
  getAllWasteDeposits
);

/*
    @route   GET /api/waste/statistics
*/

router.get(
  "/statistics",
  protect,
  adminOnly,
  getWasteStatistics
);

/*
    @route   GET /api/waste/:id
*/

router.get(
  "/:id",
  protect,
  getWasteDepositById
);

/*
    @route   PUT /api/waste/:id/verify
*/

router.put(
  "/:id/verify",
  protect,
  adminOnly,
  verifyWasteDeposit
);

/*
    @route   DELETE /api/waste/:id
*/

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteWasteDeposit
);

export default router;