import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/message.routes.js";
import roomRouter from "./routes/room.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";


const app = express();
const httpServer = http.createServer(app);

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Initialize Socket.io
const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    },
});

// Handle Socket.io connection
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.set("io", io);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/room", roomRouter);

app.use(errorHandler)

export { app, httpServer };
