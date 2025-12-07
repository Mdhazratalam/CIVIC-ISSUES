
// src/server.js
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [


      "https://civic-issues-delta.vercel.app", // citizen
      "https://civic-department.vercel.app",   // department
      "https://civic-issue-admin-ruddy.vercel.app", // admin
      "https://civic-issues-main-page.vercel.app",  // civic hub landing page
      "https://civic-issues-0c9c.onrender.com", // render backend


      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    methods: ["GET", "POST"],
  },
});

connectDB();

io.on("connection", (socket) => {
  // socket connected

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.roomId).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    // socket disconnected
  });
});

server.listen(PORT);
