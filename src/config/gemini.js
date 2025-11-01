// src/config/gemini.js
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const API_KEY = "AIzaSyAA42wkS0nPuJsSbxM8XdEzzZb9YtHqN2M"; // your new key
const MODEL_NAME = "models/gemini-2.0-flash"; // valid v1beta model

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// ✅ Async function to run chat
async function runChat(prompt) {
  try {
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        { role: "user", parts: [{ text: "Hello Gemini, who are you?" }] },
      ],
    });

    const result = await chat.sendMessage(prompt);
    console.log("Gemini says:", result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return response.text()
  }
}

export default runChat;
