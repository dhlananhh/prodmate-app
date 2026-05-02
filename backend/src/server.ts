import http from "http";
import app from "./app";
import env from "./config/env";
import { logger } from "./config/logger";
import { prisma } from "./config/database";
import { setupOpenTelemetry } from "./config/otel";


// Enable OpenTelemetry before starting the server
setupOpenTelemetry();

// Create HTTP server
const server = http.createServer(app);

// Start listening
server.listen(env.PORT, () => {
  logger.info("🚀 Server started successfully");
  logger.info(`Server running at http://localhost:${env.PORT}`);
  logger.info(`Environment: ${env.NODE_ENV}`);
  logger.info(`Listening on port: ${env.PORT}`);
  logger.info(`Swagger docs available at: http://localhost:${env.PORT}/api-docs`);
});

// Handle server errors
server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    logger.error(`❌ Port ${env.PORT} is already in use`);
    process.exit(1);
  } else {
    logger.error(`❌ Server error: ${error.message}`);
    process.exit(1);
  }
});

// Graceful shutdown
const shutdown = async (signal: string) => {
  try {
    logger.warn(`Received ${signal}. Shutting down gracefully...`);

    // Close HTTP server
    await new Promise<void>((resolve) => server.close(() => resolve()));
    logger.info("✅ HTTP server closed.");

    // Disconnect Prisma
    await prisma.$disconnect();
    logger.info("✅ Prisma connection closed.");

    process.exit(0);
  } catch (err) {
    logger.error("❌ Error during shutdown: " + (err as Error).message);
    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
