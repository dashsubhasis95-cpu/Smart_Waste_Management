// routes/truckRoutes.js

import express from "express";

import {
  createTruckRoute,
  getAllTruckRoutes,
  getTruckRouteById,
  updateTruckStatus,
  updateLiveLocation,
  deleteTruckRoute,
} from "../controllers/truckController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  adminOnly,
  createTruckRoute
);

router.get(
  "/",
  protect,
  getAllTruckRoutes
);

router.get(
  "/:id",
  protect,
  getTruckRouteById
);

router.put(
  "/:id/status",
  protect,
  updateTruckStatus
);

router.put(
  "/:id/location",
  protect,
  updateLiveLocation
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteTruckRoute
);

export default router;