const openai = require("../config/openaiConfig");
const Conversation = require("../models/Conversation");

exports.processChat = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user;

    const prompt = message; // change this later to message plus other designed prompts

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const aiResponse = completion.choices[0].message.content;

    // Create a conversation object following the Conversation schema
    const newConversation = new Conversation({
      userId,
      messages: [
        { sender: "user", text: message },
        { sender: "bot", text: aiResponse },
      ],
    });

    // Save the conversation to MongoDB
    await newConversation.save();

    // Respond with the AI response
    res.json({ message: aiResponse });
  } catch (error) {
    console.error("Error in chat processing:", error);
    if (error.response) {
      // OpenAI API error
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      // Network error
      res.status(500).json({ error: "Network error occurred" });
    } else {
      // Other errors
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};
