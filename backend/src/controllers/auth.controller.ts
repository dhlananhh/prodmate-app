import {
  Request,
  Response,
  NextFunction
} from "express";
import * as authService from "../services/auth.service";
import { ApiError } from "../utils/ApiError";
import { logger } from "../config/logger";
import {
  registerSchema,
  loginSchema,
  refreshSchema
} from "../validators/auth.validator";


/**
 * register a new user
 */
export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed for registration",
        errors: parsed.error.message
      });
    }

    const { email, username, password, name } = parsed.data;
    const user = await authService.registerUser(email, username, password, name);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user
    });
  } catch (error) {
    logger.error("Error when registering a new user: " + (error as Error).message);
    next(new ApiError(500, "Failed to register a new user", error));
  }
}


/**
 * login a user (email or username)
 */
export async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed for login",
        errors: parsed.error.message
      });
    }


    const { identifier, password } = parsed.data;

    // identifier can be email or username
    const {
      accessToken,
      refreshToken,
      user
    } = await authService.loginUser(identifier, password);

    res.json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      user
    });
  } catch (error) {
    logger.error("Error when logging a user: " + (error as Error).message);
    next(new ApiError(500, "Failed to log in a user", error));
  }
}


/**
 * refresh access token using refresh token
 */
export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsed = refreshSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed for refresh token",
        errors: parsed.error.message
      });
    }

    const { refreshToken } = parsed.data;
    const { accessToken } = await authService.refreshAccessToken(refreshToken);

    res.json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken
    });
  } catch (error) {
    logger.error("Error when refreshing access token: " + (error as Error).message);
    next(new ApiError(500, "Failed to refresh access token", error));
  }
}
