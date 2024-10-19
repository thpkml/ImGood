const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const OpenAI = require("openai");
const Conversation = require("./models/Conversation"); // Your Conversation model

// Use environment variables for configuration
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Basic Route Setup
app.get("/", (req, res) => {
  res.send("Backend is working");
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, userId } = req.body; // Assuming userId is passed with the request

    const prompt = message; // change this later to message plus other designed prompts

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const aiResponse = completion.choices[0].message.content;

    // Create a conversation object following the Conversation schema
    const newConversation = new Conversation({
      userId, // Optional in your current schema
      messages: [
        { sender: "user", text: message }, // User message
        { sender: "bot", text: aiResponse }, // AI response
      ],
      // Context and recommendation can be added if applicable
    });

    // Save the conversation to MongoDB
    await newConversation.save();

    // Respond with the AI response
    res.json({ message: aiResponse });
  } catch (error) {
    console.error("Error in saving conversation:", error);
    res.status(500).send("Server error");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
