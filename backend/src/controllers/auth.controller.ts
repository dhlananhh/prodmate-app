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
  refreshSchema,
  forgotSchema,
  resetSchema
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

    // set tokens in HTTP-only cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, // set true if using HTTPS
      sameSite: "strict",
      maxAge: 45 * 60 * 1000 // 45 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.json({
      success: true,
      message: "Login successful!",
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
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided"
      });
    }

    const { accessToken } = await authService.refreshAccessToken(refreshToken);

    // update accessToken cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 45 * 60 * 1000
    });

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


/**
 * forgot password - send reset email
 */
export async function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsed = forgotSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.message
      });
    }

    const { email } = parsed.data;
    await authService.sendResetEmail(email);

    res.json({
      success: true,
      message: "Password reset email sent successfully"
    });
  } catch (error) {
    logger.error("Error in forgotPassword: " + (error as Error).message);
    next(new ApiError(500, "Failed to send reset email", error));
  }
}


/**
 * reset password - update user password
 */
export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsed = resetSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.message
      });
    }

    const { token, newPassword } = parsed.data;
    await authService.resetUserPassword(token, newPassword);

    res.json({
      success: true,
      message: "Password reset successfully"
    });
  } catch (error) {
    logger.error("Error in resetPassword: " + (error as Error).message);
    next(new ApiError(500, "Failed to reset password", error));
  }
}


/**
 * logout user - clear cookies
 */
export async function logout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // clear cookies
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    res.json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    logger.error("Error when logging out: " + (error as Error).message);
    next(new ApiError(500, "Failed to log out", error));
  }
}
