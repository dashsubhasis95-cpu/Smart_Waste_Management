export const classifyWaste = async (
  req,
  res
) => {
  try {
    const {
      imageUrl,
    } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message:
          "Image URL is required",
      });
    }

    /*
        AI MODEL
    */

    const aiResult =
      await classifyWasteImage(
        imageUrl
      );

    /*
        GEMINI RECOMMENDATION
    */

    const recommendation =
      await generateWasteRecommendation(
        aiResult.wasteType
      );

    /*
        SAVE PREDICTION
    */

    const prediction =
      await AIPrediction.create({
        userId: req.user.id,

        imageUrl,

        predictedType:
          aiResult.wasteType,

        confidenceScore:
          aiResult.confidence,

        recyclable:
          aiResult.recyclable,

        carbonImpact:
          aiResult.carbonImpact,

        disposalSuggestion:
          recommendation,

        predictionStatus:
          "Completed",
      });

    res.status(201).json({
      success: true,

      prediction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message:
        error.message,
    });
  }
};


export const getPredictionHistory =
  async (req, res) => {
    try {
      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) ||
        10;

      const skip =
        (page - 1) * limit;

      const predictions =
        await AIPrediction.find({
          userId: req.user.id,
        })
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit);

      const total =
        await AIPrediction.countDocuments(
          {
            userId:
              req.user.id,
          }
        );

      res.status(200).json({
        success: true,

        page,

        totalPages:
          Math.ceil(
            total / limit
          ),

        total,

        predictions,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };


  export const getPredictionById =
  async (req, res) => {
    try {
      const prediction =
        await AIPrediction.findById(
          req.params.id
        );

      if (!prediction) {
        return res.status(404).json({
          success: false,

          message:
            "Prediction not found",
        });
      }

      if (
        prediction.userId.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          success: false,

          message:
            "Access denied",
        });
      }

      res.status(200).json({
        success: true,

        prediction,
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };



  export const deletePrediction =
  async (req, res) => {
    try {
      const prediction =
        await AIPrediction.findById(
          req.params.id
        );

      if (!prediction) {
        return res.status(404).json({
          success: false,

          message:
            "Prediction not found",
        });
      }

      await prediction.deleteOne();

      res.status(200).json({
        success: true,

        message:
          "Prediction deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };


  export const getAIAnalytics =
  async (req, res) => {
    try {
      const totalPredictions =
        await AIPrediction.countDocuments();

      const avgConfidence =
        await AIPrediction.aggregate([
          {
            $group: {
              _id: null,

              confidence: {
                $avg:
                  "$confidenceScore",
              },
            },
          },
        ]);

      const wasteDistribution =
        await AIPrediction.aggregate([
          {
            $group: {
              _id:
                "$predictedType",

              count: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              count: -1,
            },
          },
        ]);

      const topUsers =
        await AIPrediction.aggregate([
          {
            $group: {
              _id: "$userId",

              predictions: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              predictions: -1,
            },
          },

          {
            $limit: 10,
          },
        ]);

      const recyclableCount =
        await AIPrediction.countDocuments(
          {
            recyclable: true,
          }
        );

      res.status(200).json({
        success: true,

        analytics: {
          totalPredictions,

          averageConfidence:
            avgConfidence[0]
              ?.confidence || 0,

          recyclablePercentage:
            (
              (recyclableCount /
                totalPredictions) *
              100
            ).toFixed(2),

          wasteDistribution,

          topUsers,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };