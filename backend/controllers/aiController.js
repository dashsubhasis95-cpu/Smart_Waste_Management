import axios from "axios";

import AIPrediction from "../models/AIPrediction.js";

export const classifyWaste = async (
  req,
  res
) => {
  try {
    const imageUrl = req.body.imageUrl;

    // Call AI service

    const aiResponse =
      await axios.post(
        "http://localhost:8000/predict",
        {
          imageUrl,
        }
      );

    // Save prediction

    const prediction =
      await AIPrediction.create({
        imageUrl,

        predictedType:
          aiResponse.data.wasteType,

        confidenceScore:
          aiResponse.data.confidence,

        disposalSuggestion:
          aiResponse.data.suggestion,
      });

    res.status(200).json({
      success: true,

      prediction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};