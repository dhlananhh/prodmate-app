import dotenv from "dotenv"

dotenv.config();

interface EnvConfig {
  NODE_ENV: "development" | "production" | "test";
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  RESET_SECRET: string;
  LOG_LEVEL: "error" | "warn" | "info" | "http" | "debug";
  PRIVATE_KEY_PATH: string;
  PUBLIC_KEY_PATH: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  EMAIL_FROM: string;
}

const env: EnvConfig = {
  NODE_ENV: (process.env.NODE_ENV as EnvConfig[ "NODE_ENV" ]) || "development",
  PORT: Number(process.env.PORT) || 4000,
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "default_jwt_secret",
  RESET_SECRET: process.env.RESET_SECRET || "default_reset_secret",
  LOG_LEVEL: (process.env.LOG_LEVEL as EnvConfig[ "LOG_LEVEL" ]) || "info",
  PRIVATE_KEY_PATH: process.env.PRIVATE_KEY_PATH || "",
  PUBLIC_KEY_PATH: process.env.PUBLIC_KEY_PATH || "",
  SMTP_HOST: process.env.SMTP_HOST || "localhost",
  SMTP_PORT: Number(process.env.SMTP_PORT) || 1025,
  EMAIL_FROM: process.env.EMAIL_FROM || "reset@localhost.com",
};

export default env;
