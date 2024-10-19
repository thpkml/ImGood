const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,  //! uncomment in production
  },
  messages: [
    {
      sender: { type: String, enum: ["user", "bot"], required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  context: {
    type: Map,
    of: String, // Stores conversation context (e.g., topic, mood, etc.)
  }, // Map is a flexible key-value store. Keys can be dynamic, values must be strings (as enforced above)
  recommendation: {
    practitionerId: { type: String }, // For later integration with the recommendation engine
    recommendedAt: { type: Date },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Conversation", conversationSchema);
