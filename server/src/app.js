import "dotenv/config";

import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import { logger, pinoHttpMiddleware } from "./utils/logger.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
import chatRoutes from "./routes/chatRoutes.js";
import healthRoute from "./routes/healthRoute.js";
import metricsRoutes from "./routes/metricsRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Log requests early
app.use(pinoHttpMiddleware);

// 2. Security / CORS
app.use(cors());

// 3. Rate limiting
app.use(rateLimiter);

// 4. Request parsing
app.use(express.json());
app.use("/api/metrics", metricsRoutes);
// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Semantic LLM Cache API Running 🚀",
  });
});

// Mounted Routes
app.use("/api/health", healthRoute);
app.use("/api/chat", chatRoutes);

// 5. Global error handling (must be last)
app.use(errorHandler);

// Test database connection helper
async function connectDB() {
  await pool.query("SELECT NOW()");
  logger.info("✅ Connected to Supabase PostgreSQL");
}

// Start Server Routine
async function startServer() {
  try {
    // Verify DB connectivity before listening
    await connectDB();

    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${PORT}`);
    });

    // Graceful shutdown handlers
    const gracefulShutdown = async (signal) => {
      logger.info(`Received ${signal}. Starting graceful shutdown...`);
      server.close(async () => {
        logger.info("HTTP server closed.");
        try {
          await pool.end();
          logger.info("PostgreSQL pool connection closed.");
          process.exit(0);
        } catch (err) {
          logger.error(err, "Error closing PostgreSQL connection pool.");
          process.exit(1);
        }
      });
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  } catch (error) {
    logger.fatal(error, "❌ Server failed to start");
    process.exit(1);
  }
}

startServer();