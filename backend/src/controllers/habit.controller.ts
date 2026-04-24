import {
  Request,
  Response,
  NextFunction
} from "express";
import * as habitService from "../services/habit.service";
import { ApiError } from "../utils/ApiError";
import { Habit } from "../generated/prisma/client";
import { logger } from "../config/logger";
import {
  createHabitSchema,
  habitIdSchema,
  updateHabitSchema
} from "../validators/habit.validator";


/**
 * get all habits
 */
export const getAllHabits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const habits: Habit[] = await habitService.getAllHabits();
    res.json({
      success: true,
      message: "List of habits fetched successfully!",
      data: habits
    });
  } catch (error) {
    logger.error("Error fetching habits: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch habits", error));
  }
};


/**
 * get a single habit by id
 */
export const getHabitById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParsed = habitIdSchema.safeParse(req.params);
    if (!idParsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid habit ID",
        errors: idParsed.error.message,
      });
    }

    const habit: Habit | null = await habitService.getHabitById(Number(idParsed.data.id));
    if (!habit) {
      return res.status(404).json({
        success: false,
        error: {
          message: "Habit not found"
        }
      });
    }

    res.json({
      success: true,
      message: "Habit fetched successfully!",
      data: habit
    });
  } catch (error) {
    logger.error("Error fetching habit: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch habit", error));
  }
};


/**
 * create a new habit
 */
export const createHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = createHabitSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.message,
      });
    }

    const habitData = {
      ...parsed.data,
      startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : null,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
    };

    const habit: Habit = await habitService.createHabit(habitData);
    res.status(201).json({
      success: true,
      message: "Habit created successfully!",
      data: habit
    });
  } catch (error) {
    logger.error("Error creating habit: " + (error as Error).message);
    next(new ApiError(500, "Failed to create habit", error));
  }
};


/**
 * update an existing habit
 */
export const updateHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParsed = habitIdSchema.safeParse(req.params);
    if (!idParsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid habit ID",
        errors: idParsed.error.message,
      });
    }

    const bodyParsed = updateHabitSchema.safeParse(req.body);
    if (!bodyParsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: bodyParsed.error.message,
      });
    }

    const habitData = {
      ...bodyParsed.data,
      startDate: bodyParsed.data.startDate ? new Date(bodyParsed.data.startDate) : null,
      endDate: bodyParsed.data.endDate ? new Date(bodyParsed.data.endDate) : null,
    };

    const habit: Habit = await habitService.updateHabit(
      Number(idParsed.data.id),
      habitData
    );

    res.json({
      success: true,
      message: "Habit updated successfully!",
      data: habit
    });
  } catch (error) {
    logger.error("Error updating habit: " + (error as Error).message);
    next(new ApiError(500, "Failed to update habit", error));
  }
};


/**
 * delete a habit
 */
export const deleteHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParsed = habitIdSchema.safeParse(req.params);
    if (!idParsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid habit ID",
        errors: idParsed.error.message,
      });
    }

    const habit: Habit = await habitService.deleteHabit(Number(idParsed.data.id));

    res.json({
      success: true,
      message: "Habit deleted successfully",
      data: habit
    });
  } catch (error) {
    logger.error("Error deleting habit: " + (error as Error).message);
    next(new ApiError(500, "Failed to delete habit", error));
  }
};
