import {
  createLogger,
  format,
  transports,
  addColors,
} from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const {
  combine,
  timestamp,
  printf,
  colorize
} = format;

// định nghĩa custom levels
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
  },
};

addColors(customLevels.colors)

// định nghĩa format log
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

// khởi tạo logger
export const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    logFormat
  ),
  transports: [
    // log ra console với nhiều màu sắc
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        logFormat
      )
    }),
    // log ra file
    // new transports.File({ filename: "logs/error.log", level: "error" }),
    // new transports.File({ filename: "logs/combined.log" }),
    // new transports.File({ filename: "logs/http.log", level: "http" }),

    // Error log rotation theo ngày
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "DD-MM-YYYY",
      level: "error",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d", // giữ log 14 ngày
    }),

    // HTTP log rotation theo ngày
    new DailyRotateFile({
      filename: "logs/http-%DATE%.log",
      datePattern: "DD-MM-YYYY",
      level: "http",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "7d", // giữ log 7 ngày
    }),

    // Combined log rotation theo tháng
    new DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "MM-YYYY",
      zippedArchive: true,
      maxSize: "50m",
      maxFiles: "6m", // giữ log 6 tháng
    }),
  ]
})
