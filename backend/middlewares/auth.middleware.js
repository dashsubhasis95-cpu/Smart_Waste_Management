// middleware/authMiddleware.js

import jwt from "jsonwebtoken";

import User from "../models/User.js";

/*
    PROTECT ROUTES
*/

export const protect =
  async (req, res, next) => {
    try {
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith(
          "Bearer"
        )
      ) {
        token =
          req.headers.authorization.split(
            " "
          )[1];
      }

      if (!token) {
        return res.status(401).json({
          success: false,
          message:
            "Access denied. No token provided.",
        });
      }

      /*
          VERIFY TOKEN
      */

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      /*
          GET USER
      */

      const user =
        await User.findById(
          decoded.id
        ).select("-password");

      if (!user) {
        return res.status(401).json({
          success: false,
          message:
            "User not found",
        });
      }

      /*
          ATTACH USER
      */

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid or expired token",
      });
    }
  };

/*
    ADMIN ONLY
*/

export const adminOnly =
  (req, res, next) => {
    if (
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Admin access required",
      });
    }

    next();
  };

/*
    MUNICIPAL STAFF
*/

export const municipalOnly =
  (req, res, next) => {
    if (
      req.user.role !==
        "municipal" &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Municipal access required",
      });
    }

    next();
  };

/*
    DRIVER ACCESS
*/

export const driverOnly =
  (req, res, next) => {
    if (
      req.user.role !==
        "driver" &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Driver access required",
      });
    }

    next();
  };