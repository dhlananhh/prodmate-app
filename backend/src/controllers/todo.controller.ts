import {
  Request,
  Response,
  NextFunction
} from "express";
import * as todoService from "../services/todo.service";
import { ApiError } from "../utils/ApiError";
import { logger } from "../config/logger";
import { Todo } from "../generated/prisma/client";
import {
  createTodoSchema,
  todoIdSchema,
  updateTodoSchema
} from "../validators/todo.validator";


/**
 * get all todos
 */
export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos: Todo[] = await todoService.getAllTodos();
    res.json({
      success: true,
      message: "List of todos fetched successfully!",
      data: todos
    });
  } catch (error) {
    logger.error("Error fetching todos: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch todos", error));
  }
};


/**
 * get a single todo by id
 */
export const getTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParsed = todoIdSchema.safeParse(req.params);
    if (!idParsed.success) {
      return res.status(400).json({
        success: false,
        errors: idParsed.error.message
      })
    }

    const todo: Todo | null = await todoService.getTodoById(Number(idParsed.data.id));
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: {
          message: "Todo not found!"
        }
      })
    }

    res.json({
      success: true,
      message: "Todo fetched successfully!",
      data: todo
    });
  } catch (error) {
    logger.error("Error fetching todo: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch todo", error));
  }
};


/**
 * create a new todo
 */
export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = createTodoSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.message
      })
    }

    const todoData = {
      ...parsed.data,
      description: parsed.data.description ?? null,
      deadline: parsed.data.deadline ?? null
    };

    const todo: Todo = await todoService.createTodo(todoData);
    res.status(201).json({
      success: true,
      message: "Todo created successfully!",
      data: todo
    });
  } catch (error) {
    logger.error("Error creating todo: " + (error as Error).message);
    next(new ApiError(500, "Failed to create todo", error));
  }
};


/**
 * update an existing todo
 */
export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParsed = todoIdSchema.safeParse(req.params);
    if (!idParsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
        errors: idParsed.error.message
      })
    }

    const bodyParsed = updateTodoSchema.safeParse(req.body);
    if (!bodyParsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: bodyParsed.error.message
      })
    }

    const todo: Todo = await todoService.updateTodo(
      Number(idParsed.data.id),
      bodyParsed.data
    );
    res.json({
      success: true,
      message: "Todo updated successfully!",
      data: todo
    });
  } catch (error) {
    logger.error("Error updating todo: " + (error as Error).message);
    next(new ApiError(500, "Failed to update todo", error));
  }
};


/**
 * delete a todo
 */
export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParsed = todoIdSchema.safeParse(req.params);
    if (!idParsed.success) {
      return res.status(400).json({
        success: false,
        errors: idParsed.error.message
      })
    }

    const todo: Todo = await todoService.deleteTodo(Number(idParsed.data.id));
    res.json({
      success: true,
      message: "Todo deleted successfully!",
      data: todo
    });
  } catch (error) {
    logger.error("Error deleting todo: " + (error as Error).message);
    next(new ApiError(500, "Failed to delete todo", error));
  }
};
