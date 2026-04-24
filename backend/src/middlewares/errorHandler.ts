import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";


interface ApiError extends Error {
  statusCode: number;
  details?: any;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // nếu lỗi không có statusCode thì mặc định là 500
  const statusCode = err.statusCode || 500;

  // log chi tiết lỗi
  logger.error(
    `Error: ${err.message} | Status: ${statusCode} | Path: ${req.path} | Method: ${req.method}`
  );

  // trả response chuẩn
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || "Internal Server Error",
      details: err.details || null,
    },
  });
}
