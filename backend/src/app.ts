import "reflect-metadata";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import surveyRoutes from "./Presentation/Routes/surveyRoutes";
import authRoutes from "./Presentation/Routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/survey_app";

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/surveys", surveyRoutes);
app.use("/api/auth", authRoutes);

// Database Connection
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.error("MongoDB connection error:", err));

export default app;
