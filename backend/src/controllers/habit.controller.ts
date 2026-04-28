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
import { createTodoSchema } from "../validators/todo.validator";
import { createEventSchema } from "../validators/event.validator";


/**
 * get all habits (without relations)
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
 * get all habits with todos
 */
export const getAllHabitsWithTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const habits = await habitService.getAllHabitsWithTodos();
    res.json({
      success: true,
      message: "List of habits with todos fetched successfully!",
      data: habits,
    });
  } catch (error) {
    logger.error("Error fetching all habits with todos: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch all habits with todos", error));
  }
}


/**
 * get all habits with events
 */
export const getAllHabitsWithEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const habits = await habitService.getAllHabitsWithEvents();
    res.json({
      success: true,
      message: "List of habits with events fetched successfully!",
      data: habits,
    });
  } catch (error) {
    logger.error("Error fetching all habits with events: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch all habits with events", error));
  }
}


/**
 * get a specific habit with todos by id
 */
export const getHabitWithTodosById = async (
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

    const habit = await habitService.getHabitWithTodosById(Number(idParsed.data.id));
    if (!habit) {
      return res.status(404).json({
        success: false,
        error: { message: "Habit not found" },
      });
    }

    res.json({
      success: true,
      message: "Habit with todos fetched successfully!",
      data: habit,
    });
  } catch (error) {
    logger.error("Error fetching a specific habit with todos by id: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch a specific habit with todos by id", error));
  }
}


/**
 * get a specific habit with events by id
 */
export const getHabitWithEventsById = async (
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

    const habit = await habitService.getHabitWithEventsById(Number(idParsed.data.id));
    if (!habit) {
      return res.status(404).json({
        success: false,
        error: { message: "Habit not found" },
      });
    }

    res.json({
      success: true,
      message: "Habit with events fetched successfully!",
      data: habit,
    });
  } catch (error) {
    logger.error("Error fetching a specific habit with events by id: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch a specific habit with events by id", error));
  }
}


/**
 * get a specific habit by id (without relations)
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
 * create a new habit (without relations)
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
    logger.error("Error creating a new habit: " + (error as Error).message);
    next(new ApiError(500, "Failed to create habit", error));
  }
};


/**
 * create a new habit with an initial todo
 */
export const createHabitWithTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate habit part
    const parsedHabit = createHabitSchema.safeParse(req.body);
    if (!parsedHabit.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed for habit",
        errors: parsedHabit.error.message,
      });
    }

    // validate todo part
    const parsedTodo = createTodoSchema.safeParse(req.body.todo);
    if (!parsedTodo.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed for todo",
        errors: parsedTodo.error.message,
      });
    }

    // transform habit dates
    const habitData = {
      ...parsedHabit.data,
      startDate: parsedHabit.data.startDate ? new Date(parsedHabit.data.startDate) : null,
      endDate: parsedHabit.data.endDate ? new Date(parsedHabit.data.endDate) : null,
    };

    const todoData = {
      ...parsedTodo.data,
      deadline: parsedTodo.data.deadline ? new Date(parsedTodo.data.deadline) : null
    };

    const habit = await habitService.createHabitWithTodo(habitData, todoData);

    res.status(201).json({
      success: true,
      message: "Habit with initial todo created successfully!",
      data: habit,
    });
  } catch (error) {
    logger.error("Error creating a new habit with an initial todo: " + (error as Error).message);
    next(new ApiError(500, "Failed to create a new habit with an initial todo", error));
  }
}


/**
 * create a new habit with an initial event
 */
export const createHabitWithEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate habit part
    const parsedHabit = createHabitSchema.safeParse(req.body);
    if (!parsedHabit.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed for habit",
        errors: parsedHabit.error.message,
      });
    }

    // validate event part
    const parsedEvent = createEventSchema.safeParse(req.body.todo);
    if (!parsedEvent.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed for event",
        errors: parsedEvent.error.message,
      });
    }

    // transform habit dates
    const habitData = {
      ...parsedHabit.data,
      startDate: parsedHabit.data.startDate ? new Date(parsedHabit.data.startDate) : null,
      endDate: parsedHabit.data.endDate ? new Date(parsedHabit.data.endDate) : null,
    };

    const eventData = {
      title: parsedEvent.data.title,
      description: parsedEvent.data.description ?? null,
      date: parsedEvent.data.date!,
      type: parsedEvent.data.type.toString(),
      status: parsedEvent.data.status.toString(),
      location: parsedEvent.data.location ?? null,
      notes: parsedEvent.data.notes ?? null,
      startDate: parsedEvent.data.startDate ? new Date(parsedEvent.data.startDate) : null,
      endDate: parsedEvent.data.endDate ? new Date(parsedEvent.data.endDate) : null,
      frequency: parsedEvent.data.frequency.toString(),
    };

    const habit = await habitService.createHabitWithEvent(habitData, eventData);

    res.status(201).json({
      success: true,
      message: "Habit with initial event created successfully!",
      data: habit,
    });
  } catch (error) {
    logger.error("Error creating a new habit with an initial event: " + (error as Error).message);
    next(new ApiError(500, "Failed to create a new habit with an initial event", error));
  }
}


/**
 * update an existing habit (without relations)
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
 * update an existing habit with todos
 */
export const updateHabitWithTodos = async (
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
        errors: idParsed.error.message
      });
    }

    const bodyParsed = updateHabitSchema.safeParse(req.body);
    if (!bodyParsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: bodyParsed.error.message
      });
    }

    const habit = await habitService.updateHabitWithTodos(
      Number(idParsed.data.id),
      bodyParsed.data
    );
    res.json({
      success: true,
      message: "Habit with todos updated successfully!",
      data: habit
    });
  } catch (error) {
    logger.error("Error updating habit with todos: " + (error as Error).message);
    next(new ApiError(500, "Failed to update habit with todos", error));
  }
};


/**
 * update an existing habit with events
 */
export const updateHabitWithEvents = async (
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
        errors: idParsed.error.message
      });
    }

    const bodyParsed = updateHabitSchema.safeParse(req.body);
    if (!bodyParsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: bodyParsed.error.message
      });
    }

    const habit = await habitService.updateHabitWithEvents(
      Number(idParsed.data.id),
      bodyParsed.data
    );
    res.json({
      success: true,
      message: "Habit with events updated successfully!",
      data: habit
    });
  } catch (error) {
    logger.error("Error updating habit with events: " + (error as Error).message);
    next(new ApiError(500, "Failed to update habit with events", error));
  }
};


/**
 * delete a habit (without relations)
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


/**
 * delete a habit with todos
 */
export const deleteHabitWithTodos = async (
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
        errors: idParsed.error.message
      });
    }

    const habit = await habitService.deleteHabitWithTodos(Number(idParsed.data.id));
    res.json({
      success: true,
      message: "Habit with todos deleted successfully!",
      data: habit
    });
  } catch (error) {
    logger.error("Error deleting habit with todos: " + (error as Error).message);
    next(new ApiError(500, "Failed to delete habit with todos", error));
  }
};


/**
 * delete a habit with events
 */
export const deleteHabitWithEvents = async (
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
        errors: idParsed.error.message
      });
    }

    const habit = await habitService.deleteHabitWithEvents(Number(idParsed.data.id));
    res.json({
      success: true,
      message: "Habit with events deleted successfully!",
      data: habit
    });
  } catch (error) {
    logger.error("Error deleting habit with events: " + (error as Error).message);
    next(new ApiError(500, "Failed to delete habit with events", error));
  }
};
