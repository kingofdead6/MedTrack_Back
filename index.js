import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./Routes/userRoute.js";
import healthCareRoute from "./Routes/healthCareRoute.js";

dotenv.config();
mongoose.set("strictQuery", true);

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/healthcare", healthCareRoute);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});