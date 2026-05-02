import {
  Request,
  Response,
  NextFunction
} from "express";
import * as userService from "../services/user.service";
import { ApiError } from "../utils/ApiError";
import { logger } from "../config/logger";
import { User } from "../generated/prisma/client";


/**
 * get all users
 */
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: User[] = await userService.getAllUsers();
    res.json({
      success: true,
      message: "List of users fetched successfully!",
      data: users
    });
  } catch (error) {
    logger.error("Error when fetching users: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch users", error));
  }
}


/**
 * get a specific user by id
 */
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const user: User | null = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          message: "User not found!"
        }
      });
    }

    res.json({
      success: true,
      message: "User fetched successfully!",
      data: user
    });
  } catch (error) {
    logger.error("Error when fetching user: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch user", error));
  }
}


/**
 * register a new user
 */
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      email,
      username,
      password,
      name
    } = req.body;

    const user = await userService.registerUser({
      email,
      username,
      password,
      name
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: user
    });
  } catch (error) {
    logger.error("Error when registering user: " + (error as Error).message);
    next(new ApiError(400, "Failed to register user", error));
  }
};


/**
 * login user
 */
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { identifier, password } = req.body;

    // identifier can be either an email or a username
    const {
      user,
      accessToken,
      refreshToken
    } = await userService.loginUser(identifier, password);

    res.json({
      success: true,
      message: "Login successful!",
      data: {
        user, accessToken, refreshToken
      }
    });
  } catch (error) {
    logger.error("Error when logging in user: " + (error as Error).message);
    next(new ApiError(400, "Failed to login user", error));
  }
};


/**
 * get profile of logged-in user
 */
export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const profile = await userService.getUserProfile(userId);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "User not found!"
      });
    }

    res.json({
      success: true,
      message: "Profile fetched successfully!",
      data: profile
    });
  } catch (error) {
    logger.error("Error when fetching profile: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch profile", error));
  }
};


/**
 * refresh access token using refresh token
 */
export async function refresh(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { refreshToken } = req.body;
    const { accessToken } = await userService.refreshAccessToken(refreshToken);
    res.json({
      success: true,
      message: "Token refreshed",
      data: {
        accessToken
      }
    });
  } catch (error) {
    logger.error("Error when refreshing token: " + (error as Error).message);
    next(new ApiError(401, "Failed to refresh token", error));
  }
}
