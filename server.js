import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"; // Correct path
import { pool } from "./config/db.js"; // Update path if needed

dotenv.config();

const app = express();

// Konfigurasi CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Sesuaikan dengan URL frontend Anda
    credentials: true, // Penting untuk mengizinkan cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes); // Add the route for user authentication

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
