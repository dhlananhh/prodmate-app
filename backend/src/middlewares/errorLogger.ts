import {
  Request,
  Response,
  NextFunction
} from "express";
import { logger } from "../config/logger";


export const errorLogger = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  if (statusCode >= 500) {
    logger.error(
      `Error: ${err.message} | Method: ${req.method} | URL: ${req.originalUrl} | IP: ${req.ip}`,
      { stack: err.stack }
    );
  } else if (statusCode >= 400) {
    logger.warn(
      `Warning: ${err.message} | Method: ${req.method} | URL: ${req.originalUrl} | IP: ${req.ip}`
    );
  } else {
    logger.info(
      `Info: ${err.message} | Method: ${req.method} | URL: ${req.originalUrl} | IP: ${req.ip}`
    );
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || "Internal Server Error",
    },
  });

  next();
};
