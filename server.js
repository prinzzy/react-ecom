import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"; // Correct path
import { pool } from "./config/db.js"; // Update path if needed

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Enable CORS

// Routes
app.use("/api/auth", userRoutes); // Add the route for user authentication

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
