const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = "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";

app.post("/ask", async (req, res) => {
  try {
    const userQuestion = req.body.question;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo", // free tier supported
        messages: [
          { role: "user", content: userQuestion }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Sarvadaamana AI"
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({ answer: reply });

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);
    res.json({ answer: "Error connecting to OpenRouter." });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});