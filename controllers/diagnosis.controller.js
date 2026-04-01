const Diagnosis = require("../models/diagnosis.model");
const { getDiagnosisFromAI } = require("../services/aiService");
const { z } = require("zod");

const DiagnosisSchema = z.array(
  z.object({
    condition: z.string(),
    probability: z.string(),
    next_steps: z.string(),
  })
);

const basicFallback = (symptoms) => {
  const s = symptoms.toLowerCase();

  if (s.includes("fever") && s.includes("cough")) {
    return [
      {
        condition: "Viral Infection",
        probability: "60%",
        next_steps: "Consult a general physician and take rest"
      },
      {
        condition: "Flu",
        probability: "40%",
        next_steps: "Get a flu test and monitor temperature"
      }
    ];
  }

  return [
    {
      condition: "General Illness",
      probability: "50%",
      next_steps: "Consult a doctor for further evaluation"
    }
  ];
};

const diagnose = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || typeof symptoms !== "string") {
      return res.status(400).json({
        success: false,
        error: "Valid symptoms string is required",
      });
    }

    let aiResult;

    try {
      const rawResult = await getDiagnosisFromAI(symptoms);

      aiResult = DiagnosisSchema.parse(rawResult);

    } catch (aiError) {
      console.error("AI failed, using fallback:", aiError.message);

      aiResult = basicFallback(symptoms);
    }

    const saved = await Diagnosis.create({
      symptoms,
      results: aiResult,
    });

    res.status(200).json({
      success: true,
      data: aiResult,
    });

  } catch (error) {
    console.error("Server Error:", error.message);

    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};


const getHistory = async (req, res) => {
  try {
    const history = await Diagnosis.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });

  } catch (error) {
    console.error("History Error:", error.message);

    res.status(500).json({
      success: false,
      error: "Failed to fetch history",
    });
  }
};

module.exports = { diagnose, getHistory };