import express, {
  Application,
  Request,
  Response
} from "express";
import morgan from "morgan";
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
import { security } from "./middlewares/security";
import { errorLogger } from "./middlewares/errorLogger";


const app: Application = express();

// Global Middleware
app.use(corsConfig);
app.use(helmetConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan + Winston integration for request logging
const stream = {
  write: (message: string) => logger.http(message.trim()),
};
app.use(morgan(":method :url :status :res[content-length] - :response-time ms", { stream }));

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
      todos: "/api/todos",
      habits: "/api/habits",
      events: "/api/events",
      docs: "/api-docs",
    }
  });
});


// Health check route
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", env: env.NODE_ENV });
});

// Not Found Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

// Error Log Middleware
app.use(errorLogger);

// Export app
export default app;
