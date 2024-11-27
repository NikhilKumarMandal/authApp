import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/message.routes.js";
import roomRouter from "./routes/room.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const app = express();
const httpServer = http.createServer(app);

const port = process.env.PORT || 8000;
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";

// Database Connection
(async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully!");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // Exit if database connection fails
  }
})();

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" })); // Adjusted limit
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Test Route for Debugging
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy!");
});

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/room", roomRouter);

// Error Testing Route (for debugging purposes)
app.get("/error-test", (req, res, next) => {
  next(new Error("This is a test error"));
});

// Error handler
app.use(errorHandler);

// Socket.IO Events
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

  socket.on("error", (err) => {
    console.error("Socket.IO Error:", err);
  });
});

// Start the server
httpServer.listen(port, () => {
  console.log(`⚙️  Server is running at port: ${port}`);
  console.log(`🌐 CORS origin: ${corsOrigin}`);
});

