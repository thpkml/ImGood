const openai = require("../config/openaiConfig");
const Conversation = require("../models/Conversation");

exports.processChat = async (req, res) => {
  try {
    const { message, conversationId } = req.body;
    const userId = req.user;

    let conversation;
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (!conversation || conversation.userId.toString() !== userId) {
        return res.status(404).json({ error: "Conversation not found" });
      }
    } else {
      conversation = new Conversation({ userId, topic: "New Conversation" });
    }

    const prompt = message;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a mental health assistant." },
        ...conversation.messages.map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        })),
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    });

    const aiResponse = completion.choices[0].message.content;

    conversation.messages.push(
      { sender: "user", text: message },
      { sender: "bot", text: aiResponse }
    );
    conversation.updatedAt = Date.now();

    await conversation.save();

    res.json({
      message: aiResponse,
      conversationId: conversation._id,
      topic: conversation.topic,
    });
  } catch (error) {
    console.error("Error in chat processing:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ userId: req.user })
      .select("topic createdAt updatedAt")
      .sort("-updatedAt");
    res.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.user,
    });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.json(conversation);
  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).json({ error: "Failed to fetch conversation" });
  }
};

exports.updateConversationTopic = async (req, res) => {
  try {
    const { topic } = req.body;
    const conversation = await Conversation.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      { topic },
      { new: true }
    );
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.json(conversation);
  } catch (error) {
    console.error("Error updating conversation topic:", error);
    res.status(500).json({ error: "Failed to update conversation topic" });
  }
};

exports.deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOneAndDelete({
      _id: req.params.id,
      userId: req.user,
    });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.json({ message: "Conversation deleted successfully" });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    res.status(500).json({ error: "Failed to delete conversation" });
  }
};
