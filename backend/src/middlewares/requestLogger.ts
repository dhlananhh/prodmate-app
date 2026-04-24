import {
  NextFunction,
  Request,
  Response
} from "express";
import { logger } from "../config/logger";


export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  // khi response kết thúc thì log thông tin
  res.on("finish", () => {
    const duration = Date.now() - start;

    const logMessage = `${req.method} ${req.originalUrl} | Status: ${res.statusCode} | Duration: ${duration}ms | IP: ${req.ip}`;

    // log theo custom level "http" đã định nghĩa trong logger.ts
    if (process.env.NODE_ENV === "development") {
      logger.http(`${logMessage} | Body: ${JSON.stringify(req.body)}`);
    } else {
      logger.http(logMessage);
    }
  });

  next();
}
