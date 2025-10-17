

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

export default function ChatWindow({ chatId, user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", chatId);

    // ✅ Load previous messages if backend supports it
    socket.on("loadMessages", (oldMessages) => {
      setMessages(oldMessages);
    });

    const handleReceiveMessage = (msg) => {
      // Avoid duplicating your own message
      if (msg.sender !== getSenderName()) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("loadMessages");
    };
  }, [chatId]);

  // ✅ Determine who is the sender
  const getSenderName = () => {
    if (user?.role === "department") return user.name;
    if (user?.name) return `Citizen (${user.name})`;
    return "Citizen";
  };

  const sendMessage = () => {
    if (!text.trim()) return;
    const msg = {
      roomId: chatId,
      sender: getSenderName(),
      text,
    };

    // Add locally first for instant feedback
    setMessages((prev) => [...prev, msg]);

    // Emit to server
    socket.emit("sendMessage", msg);

    setText("");
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-xl border max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-3 text-blue-600 text-center">💬 Live Chat</h2>

      <div className="h-64 overflow-y-auto border p-3 mb-3 rounded-lg bg-gray-50">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm text-center">No messages yet...</p>
        )}
        {messages.map((m, i) => (
          <p key={i} className="mb-1 text-sm">
            <b className="text-blue-700">{m.sender}: </b>
            {m.text}
          </p>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
