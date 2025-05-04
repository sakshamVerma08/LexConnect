import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, ".env") });
console.log("Environment variables loaded:", {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY ? "Set" : "Not set",
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI ? "Set" : "Not set",
});

import authRoutes from "./routes/auth.js";
import lawyerRoutes from "./routes/lawyer.js";
import caseRoutes from "./routes/cases.js";
// import documentScannerRoutes from "./routes/documentScanner.js";

const app = express();

// CORS Middleware :
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connecting to MongoDB Here :
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/lexconnect", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/cases", caseRoutes);
// app.use("/api/document-scanner", documentScannerRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "LexConnect Backend API is running",
    endpoints: {
      auth: "/api/auth",
      lawyers: "/api/lawyers",
      cases: "/api/cases",
      documentScanner: "/api/document-scanner",
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
