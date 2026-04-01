const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getDiagnosisFromAI = async (symptoms) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a medical assistant.

Given symptoms: "${symptoms}"

Return EXACTLY 2-3 possible conditions.

STRICT FORMAT (valid JSON only):
[
  {
    "condition": "",
    "probability": "",
    "next_steps": ""
  }
]

Rules:
- Probability must be percentage
- Keep next_steps practical (doctor/test)
- No extra text outside JSON
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]") + 1;
    const cleanJson = text.substring(jsonStart, jsonEnd);

    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("AI Error:", error.message);
    throw new Error("AI processing failed");
  }
};

module.exports = { getDiagnosisFromAI };