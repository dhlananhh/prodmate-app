import express, {
  Application,
  Request,
  Response
} from "express";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { prisma } from "./config/database";
import env from "./config/env";
import { logger } from "./config/logger";
import corsConfig from "./config/cors";
import helmetConfig from "./config/helmet";
import { setupSwagger } from "./config/swagger";
import routes from "./routes";
import {
  notFoundHandler,
  errorHandler
} from "./middlewares";
import { requestLogger } from "./middlewares/requestLogger";
import { security } from "./middlewares/security.middleware";
import { errorLogger } from "./middlewares/errorLogger";


const app: Application = express();

// register the /metrics route in the app.ts file.
app.get("/metrics", (req, res) => {
  try {
    const filePath = path.join(__dirname, "../logs/traces.json");

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        error: {
          message: "No logs/traces.json file found",
          path: "/metrics",
          method: "GET"
        }
      });
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const lines = fileContent.trim().split("\n").filter(line => line.length > 0);
    const data = lines.map(line => JSON.parse(line));

    res.json({
      success: true,
      traces: data
    });
  } catch (error) {
    logger.error("❌ Error reading traces.json file: " + (error as Error).message);
    res.status(500).json({
      success: false,
      error: {
        message: "Failed to read traces.json",
        path: "/metrics",
        method: "GET"
      }
    });
  }
});


// Global Middleware
app.use(corsConfig);
app.use(helmetConfig);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Morgan + Winston integration for request logging
const stream = {
  write: (message: string) => logger.http(message.trim()),
};
app.use(morgan(":method :url :status :res[content-length] - :response-time ms", { stream }));

// rate limiting for login
const loginLimiter = rateLimit({
  windowMs: 45 * 60 * 1000, // 45 mins
  max: 10, // maximum 10 requests per 45 mins
  message: {
    success: false,
    message: "Too many login attempts. Please try again later!"
  }
})
app.use("/api/users/login", loginLimiter);

// Custom request logger (logs request + response)
app.use(requestLogger);

// Security
app.use(
  security.corsMiddleware,
  security.helmetMiddleware,
  security.rateLimiter
);

// Routes
app.use("/api", routes);

// error handler
app.use((
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  logger.error(err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message
  });
});

// Swagger docs
setupSwagger(app);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.json({
    name: "ProdMate API",
    version: "1.0.0",
    status: "running",
    environment: env.NODE_ENV,
    endpoints: {
      health: "/api/health",
      docs: "/api-docs",
      metrics: "/metrics",
      auth: "/api/auth",
      todos: "/api/todos",
      habits: "/api/habits",
      events: "/api/events",
      users: "/api/users",
    }
  });
});


// Health check route
app.get("/api/health", async (
  req: Request,
  res: Response
) => {
  try {
    // check the database connection
    let dbStatus = "disconnected";
    try {
      await prisma.$executeRaw`SELECT 1`;
      dbStatus = "connected";
    } catch {
      dbStatus = "error";
    }

    res.json({
      success: true,
      status: "ok",
      service: "prodmate-backend",
      version: "1.0.0",
      environment: env.NODE_ENV,
      timestamp: new Date().toDateString(),
      dependencies: {
        database: dbStatus,
        opentelemetry: "enabled"
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: "Health check failed",
        path: "/api/health",
        method: "GET"
      }
    });
  }
});

// Not Found Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

// Error Log Middleware
app.use(errorLogger);

// Export app
export default app;
