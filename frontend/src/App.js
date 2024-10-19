// src/App.js
import React, { useState } from "react";
import { fetchChat } from "./api";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // Function to handle user input submission
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user's message to chat log
    setChat([...chat, { sender: "user", text: message }]);

    // Fetch AI response from backend
    const response = await fetchChat(message);

    if (response) {
      // Add AI response to chat log
      setChat([
        ...chat,
        { sender: "user", text: message },
        { sender: "ai", text: response.message },
      ]);
    }

    // Clear input
    setMessage("");
  };

  return (
    <div className="App">
      <h1>Mental Health Chat Assistant</h1>
      <div className="chatbox">
        {chat.map((entry, index) => (
          <div key={index} className={`message ${entry.sender}`}>
            <strong>{entry.sender}: </strong>
            {entry.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default App;
