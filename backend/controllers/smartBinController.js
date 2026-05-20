// controllers/smartBinController.js

import axios from "axios";

import SmartBin from "../models/SmartBin.js";

export const updateBinIoTData =
  async (req, res) => {
    try {
      const {
        fillLevel,
        temperature,
        odorLevel,
        humidity,
        gasLevel,
      } = req.body;

      // Find Smart Bin

      const bin =
        await SmartBin.findById(
          req.params.id
        );

      if (!bin) {
        return res.status(404).json({
          success: false,
          message: "Smart bin not found",
        });
      }

      /*
          SEND SENSOR DATA TO AI SERVICE
      */

      const aiResponse =
        await axios.post(
          "http://localhost:8000/predict-bin-status",
          {
            fillLevel,
            temperature,
            odorLevel,
            humidity,
            gasLevel,
          }
        );

      /*
          UPDATE BIN DATA
      */

      bin.fillLevel = fillLevel;

      bin.temperature = temperature;

      bin.odorLevel = odorLevel;

      /*
          AI PREDICTIONS
      */

      bin.overflowRisk =
        aiResponse.data.overflowRisk;

      bin.predictedOverflowTime =
        aiResponse.data
          .predictedOverflowHours;

      bin.collectionPriority =
        aiResponse.data
          .collectionPriority;

      bin.fireHazard =
        aiResponse.data.fireHazard;

      bin.recommendedAction =
        aiResponse.data
          .recommendedAction;

      await bin.save();

      /*
          REALTIME SOCKET EVENT
      */

      // io.emit("binUpdated", bin);

      res.status(200).json({
        success: true,

        message:
          "IoT smart bin updated successfully",

        bin,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };