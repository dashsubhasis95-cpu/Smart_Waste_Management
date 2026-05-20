// routes/complaintRoutes.js

import express from "express";

import {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
} from "../controllers/complaintController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createComplaint
);

router.get(
  "/",
  protect,
  adminOnly,
  getAllComplaints
);

router.get(
  "/:id",
  protect,
  getComplaintById
);

router.put(
  "/:id/status",
  protect,
  adminOnly,
  updateComplaintStatus
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteComplaint
);

export default router;