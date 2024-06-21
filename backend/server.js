import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from './db/connectToMongoDB.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


// Middleware to parse JSON requests

// app.get("/", (req, res) => {
//     res.send("Hello world!!");
// });


app.listen(PORT, async () => {
    try {
        await connectToMongoDB();
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
});
