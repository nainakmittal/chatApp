import express from 'express';
import dotenv from "dotenv";
import path from 'path';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from "./socket/socket.js"

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})



// Root route


app.get("/", (req, res) => {
    res.send("Hello world!!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server and connect to MongoDB
server.listen(PORT, async () => {
    try {
        await connectToMongoDB();
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
});
