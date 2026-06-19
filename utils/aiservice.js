// utils/aiService.js

import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const model =
  genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

/*
    WASTE CLASSIFICATION
*/

export const classifyWasteImage =
  async (imageDescription) => {
    try {
      const prompt = `
        You are a smart waste classification AI.

        Analyze this waste:

        ${imageDescription}

        Return JSON only:

        {
          "wasteType":"",
          "confidence":95,
          "recyclable":true,
          "carbonImpact":0.5
        }
      `;

      const result =
        await model.generateContent(
          prompt
        );

      const response =
        result.response.text();

      return JSON.parse(response);
    } catch (error) {
      throw new Error(
        "Waste classification failed"
      );
    }
  };

/*
    RECYCLING RECOMMENDATION
*/

export const generateWasteRecommendation =
  async (wasteType) => {
    try {
      const prompt = `
        Waste Type: ${wasteType}

        Give:
        - disposal suggestion
        - recycling method
        - environmental impact

        Maximum 100 words.
      `;

      const result =
        await model.generateContent(
          prompt
        );

      return result.response.text();
    } catch (error) {
      throw new Error(
        "Recommendation generation failed"
      );
    }
  };

/*
    SMART BIN INSIGHTS
*/

export const generateBinInsights =
  async (
    fillLevel,
    odorLevel,
    temperature
  ) => {
    try {
      const prompt = `
        Smart Bin Data:

        Fill Level: ${fillLevel}
        Odor Level: ${odorLevel}
        Temperature: ${temperature}

        Predict:

        1. Overflow Risk
        2. Collection Priority
        3. Recommended Action

        Return JSON only.
      `;

      const result =
        await model.generateContent(
          prompt
        );

      return result.response.text();
    } catch (error) {
      throw new Error(
        "Bin prediction failed"
      );
    }
  };

/*
    AI SUSTAINABILITY REPORT
*/

export const generateSustainabilityReport =
  async (
    analyticsData
  ) => {
    try {
      const prompt = `
        Analyze this smart waste data:

        ${JSON.stringify(
          analyticsData
        )}

        Generate:

        - Key Insights
        - Trends
        - Recommendations
        - Sustainability Score

        Format professionally.
      `;

      const result =
        await model.generateContent(
          prompt
        );

      return result.response.text();
    } catch (error) {
      throw new Error(
        "Report generation failed"
      );
    }
  };

/*
    AI CHATBOT
*/

export const askWasteAssistant =
  async (question) => {
    try {
      const prompt = `
        You are an expert waste management assistant.

        Question:

        ${question}
      `;

      const result =
        await model.generateContent(
          prompt
        );

      return result.response.text();
    } catch (error) {
      throw new Error(
        "Assistant failed"
      );
    }
  };