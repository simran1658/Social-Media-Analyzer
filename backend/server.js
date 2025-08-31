// Imports
import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import cors from "cors";
import PDFParser from "pdf2json";
import Tesseract from "tesseract.js";
import path from 'path';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Multer setup
const upload = multer({ dest: "uploads/" });

// Load API key and port from .env
const API_KEY = process.env.GEMINI_API_KEY;
const PORT = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing in .env file");
  process.exit(1);
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(API_KEY);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Server is running...");
});

// Analyze route
app.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    let extractedText = "";

    async function analyzeAndRespond() {
      fs.unlinkSync(req.file.path);

      const prompt = `
         You are a world-class social media strategist. Analyze the following content and provide a **very concise, actionable report**.

Output format:
1. Strategic Recommendations: **4 points only**, each **1 sentence**, short, practical, and actionable. Focus on:
   - Hooks & Copy
   - Visual Strategy
   - Engagement Tactics

⚠️ Important:
-Only give points, don't give the heading Strategic Recommendations.
- Do not include extra explanation, paragraphs, or details.
- Use numbered points for recommendations.
- Be direct, specific, and clear.

Content to analyze:
          
          "${extractedText}"
        `;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const aiResponse = await model.generateContent([{ text: prompt }]);

      res.json({ suggestions: aiResponse.response.text() });
    }

    if (req.file.mimetype === "application/pdf") {
      const pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        // Access pages from the passed pdfData object
        extractedText = pdfData.Pages
          .map((page) =>
            page.Texts.map((text) =>
              decodeURIComponent(text.R.map((r) => r.T).join(""))
            ).join(" ")
          )
          .join(" ");

        analyzeAndRespond();
      });

      pdfParser.on("pdfParser_dataError", (errData) => {
        console.error("Error parsing PDF:", errData.parserError);
        fs.unlinkSync(req.file.path);
        res.status(500).json({ error: "Failed to parse PDF" });
      });

      pdfParser.loadPDF(req.file.path);
    } else if (req.file.mimetype.startsWith("image/")) {
      const result = await Tesseract.recognize(req.file.path, "eng");
      extractedText = result.data.text;
      await analyzeAndRespond();
    } else {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "Unsupported file type" });
    }
  } catch (err) {
    console.error("Error analyzing file:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});