// controllers/truckController.js

import TruckRoute from "../models/TruckRoute.js";

import SmartBin from "../models/SmartBin.js";

import Notification from "../models/Notification.js";

import axios from "axios";

/*
    CREATE AI OPTIMIZED TRUCK ROUTE
*/

export const createTruckRoute =
  async (req, res) => {
    try {
      const {
        truckId,
        driverName,
        driverContact,
      } = req.body;

      /*
          GET HIGH PRIORITY BINS
      */

      const bins =
        await SmartBin.find({
          fillLevel: {
            $gte: 70,
          },

          isActive: true,
        });

      /*
          SEND TO AI ROUTE OPTIMIZER
      */

      const aiResponse =
        await axios.post(
          "http://localhost:8000/optimize-route",
          {
            bins,
          }
        );

      /*
          AI RESPONSE
      */

      const {
        optimizedRoute,
        optimizedDistance,
        estimatedFuelUsage,
        estimatedCompletionTime,
        efficiencyScore,
      } = aiResponse.data;

      /*
          CREATE ROUTE
      */

      const truckRoute =
        await TruckRoute.create({
          truckId,

          driverName,

          driverContact,

          assignedBins:
            bins.map(
              (bin) => bin._id
            ),

          routeCoordinates:
            optimizedRoute,

          optimizedDistance,

          estimatedFuelUsage,

          estimatedCompletionTime,

          routeEfficiencyScore:
            efficiencyScore,

          status: "Assigned",
        });

      /*
          SEND NOTIFICATION
      */

      await Notification.create({
        title:
          "Truck Route Assigned",

        message: `AI optimized route created for truck ${truckId}`,

        notificationType:
          "System Notification",

        priority: "High",
      });

      res.status(201).json({
        success: true,

        message:
          "AI optimized truck route created",

        truckRoute,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    GET ALL TRUCK ROUTES
*/

export const getAllTruckRoutes =
  async (req, res) => {
    try {
      const routes =
        await TruckRoute.find()
          .populate(
            "assignedBins",
            "binId fillLevel location"
          )
          .sort({
            createdAt: -1,
          });

      /*
          ROUTE ANALYTICS
      */

      const analytics =
        await TruckRoute.aggregate([
          {
            $group: {
              _id: "$status",

              totalRoutes: {
                $sum: 1,
              },

              avgEfficiency: {
                $avg:
                  "$routeEfficiencyScore",
              },
            },
          },
        ]);

      res.status(200).json({
        success: true,

        totalRoutes:
          routes.length,

        routes,

        analytics,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    GET SINGLE TRUCK ROUTE
*/

export const getTruckRouteById =
  async (req, res) => {
    try {
      const route =
        await TruckRoute.findById(
          req.params.id
        ).populate(
          "assignedBins",
          "binId fillLevel location"
        );

      if (!route) {
        return res.status(404).json({
          success: false,

          message:
            "Truck route not found",
        });
      }

      res.status(200).json({
        success: true,

        route,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    UPDATE TRUCK STATUS
*/

export const updateTruckStatus =
  async (req, res) => {
    try {
      const { status } = req.body;

      const route =
        await TruckRoute.findById(
          req.params.id
        );

      if (!route) {
        return res.status(404).json({
          success: false,

          message:
            "Truck route not found",
        });
      }

      /*
          UPDATE STATUS
      */

      route.status = status;

      /*
          START / COMPLETE TIME
      */

      if (
        status === "Collecting"
      ) {
        route.startedAt =
          new Date();
      }

      if (
        status === "Completed"
      ) {
        route.completedAt =
          new Date();

        /*
            AUTO RESET BINS
        */

        await SmartBin.updateMany(
          {
            _id: {
              $in:
                route.assignedBins,
            },
          },
          {
            fillLevel: 10,

            status: "Empty",
          }
        );
      }

      await route.save();

      res.status(200).json({
        success: true,

        message:
          "Truck status updated",

        route,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    UPDATE LIVE TRUCK LOCATION
*/

export const updateLiveLocation =
  async (req, res) => {
    try {
      const {
        lat,
        lng,
      } = req.body;

      const route =
        await TruckRoute.findById(
          req.params.id
        );

      if (!route) {
        return res.status(404).json({
          success: false,

          message:
            "Truck route not found",
        });
      }

      /*
          UPDATE LIVE LOCATION
      */

      route.liveLocation = {
        lat,
        lng,
      };

      await route.save();

      /*
          REALTIME SOCKET EVENT
      */

      // io.emit("truckLocationUpdated", route);

      res.status(200).json({
        success: true,

        message:
          "Truck live location updated",

        liveLocation:
          route.liveLocation,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };

/*
    DELETE TRUCK ROUTE
*/

export const deleteTruckRoute =
  async (req, res) => {
    try {
      const route =
        await TruckRoute.findById(
          req.params.id
        );

      if (!route) {
        return res.status(404).json({
          success: false,

          message:
            "Truck route not found",
        });
      }

      await route.deleteOne();

      res.status(200).json({
        success: true,

        message:
          "Truck route deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };