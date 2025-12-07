// src/components/Chatbot.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import botIcon from "../assets/bot.png";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm CivicBot. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    simulateBotResponse(input);
  };

  const simulateBotResponse = (userInput) => {
    setTyping(true);

    setTimeout(() => {
      const reply = getBotReply(userInput);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      setTyping(false);
    }, 1200);
  };

  const getBotReply = (input) => {
    const lower = input.toLowerCase();
    if (lower.includes("report")) return "You can report an issue via the 'Create Report' page.";
    if (lower.includes("status")) return "Track your issue in the 'My Reports' section.";
    if (lower.includes("location")) return "Make sure location is enabled in your browser.";
    if (lower.includes("help")) return "You can ask me about reporting, tracking, or contact info.";
    return "Sorry, I didn't quite get that. Try asking about report, status, or help.";
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50"
      >
        <img
          src={botIcon}
          alt="Chatbot"
          className="w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        />
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 max-h-[500px] bg-white shadow-xl rounded-lg flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white px-4 py-3 font-semibold text-sm">
              👋 CivicBot — Your Assistant
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-xl max-w-[75%] ${
                      msg.sender === "user"
                        ? "bg-blue-100 text-right"
                        : "bg-gray-200 text-left"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="text-gray-400 text-xs animate-pulse">CivicBot is typing...</div>
              )}
            </div>

            {/* Input */}
            <div className="flex p-2 border-t">
              <input
                type="text"
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border p-2 rounded-l text-sm"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 rounded-r text-sm"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
