import dotenv from "dotenv"

dotenv.config();

interface EnvConfig {
  NODE_ENV: "development" | "production" | "test";
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  LOG_LEVEL: "error" | "warn" | "info" | "http" | "debug";
}

const env: EnvConfig = {
  NODE_ENV: (process.env.NODE_ENV as EnvConfig[ "NODE_ENV" ]) || "development",
  PORT: Number(process.env.PORT) || 4000,
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "default_secret",
  LOG_LEVEL: (process.env.LOG_LEVEL as EnvConfig[ "LOG_LEVEL" ]) || "info",
};

export default env;
