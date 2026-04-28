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
 * get all todos (without relations)
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
 * get a single todo by id (without relations)
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
 * get all todos of habit X
 */
export const getAllTodosOfHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const habitId = Number(req.params.habitId);
    const todos = await todoService.getAllTodosByHabit(habitId);
    res.json({
      success: true,
      message: "Todos of habit fetched successfully!",
      data: todos
    });
  } catch (error) {
    logger.error("Error fetching todos of habit: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch todos of habit", error));
  }
};


/**
 * get a specific todo in habit X
 */
export const getTodoOfHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const habitId = Number(req.params.habitId);
    const todoId = Number(req.params.todoId);
    const todo = await todoService.getTodoByHabit(habitId, todoId);

    if (!todo)
      return res.status(404).json({
        success: false,
        message: "Todo not found in habit!"
      });

    res.json({
      success: true,
      message: "Todo of habit fetched successfully!",
      data: todo
    });
  } catch (error) {
    logger.error("Error fetching todo of habit: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch todo of habit", error));
  }
};


/**
 * get all todos in event Y
 */
export const getAllTodosOfEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventId = Number(req.params.eventId);
    const todos = await todoService.getAllTodosByEvent(eventId);
    res.json({
      success: true,
      message: "Todos of event fetched successfully!",
      data: todos
    });
  } catch (error) {
    logger.error("Error fetching todos of event: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch todos of event", error));
  }
};


/**
 * get a specific todo in event Y
 */
export const getTodoOfEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventId = Number(req.params.eventId);
    const todoId = Number(req.params.todoId);
    const todo = await todoService.getTodoByEvent(eventId, todoId);

    if (!todo)
      return res.status(404).json({
        success: false,
        message: "Todo not found in event!"
      });

    res.json({
      success: true,
      message: "Todo of event fetched successfully!",
      data: todo
    });
  } catch (error) {
    logger.error("Error fetching todo of event: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch todo of event", error));
  }
};


/**
 * create a new todo (without relations)
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
      deadline: parsed.data.deadline ? new Date(parsed.data.deadline) : null
    };

    const todo: Todo = await todoService.createTodo(todoData);
    res.status(201).json({
      success: true,
      message: "Todo created successfully!",
      data: todo
    });
  } catch (error) {
    logger.error("Error creating a new todo: " + (error as Error).message);
    next(new ApiError(500, "Failed to create a new todo", error));
  }
};


/**
 * create a new todo belonging to habit X
 */
export const createTodoForHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const habitId = Number(req.params.habitId);

    const {
      title,
      description,
      deadline,
      priority,
      status
    } = req.body;

    const todo = await todoService.createTodoForHabit(habitId, {
      title,
      description,
      deadline,
      priority,
      status
    });

    res.status(201).json({
      success: true,
      message: "Todo for habit created successfully!",
      data: todo
    });
  } catch (error) {
    logger.error("Error creating todo for habit: " + (error as Error).message);
    next(new ApiError(500, "Failed to create todo for habit", error));
  }
};


/**
 * create a new todo belonging to event Y
 */
export const createTodoForEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventId = Number(req.params.eventId);

    const {
      title,
      description,
      deadline,
      priority,
      status
    } = req.body;

    const todo = await todoService.createTodoForEvent(eventId, {
      title,
      description,
      deadline,
      priority,
      status
    });

    res.status(201).json({
      success: true,
      message: "Todo for event created successfully!",
      data: todo
    });
  } catch (error) {
    logger.error("Error creating todo for event: " + (error as Error).message);
    next(new ApiError(500, "Failed to create todo for event", error));
  }
};


/**
 * update an existing todo (without relations)
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
 * update an existing todo belonging to habit X
 */
export const updateTodoOfHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const habitId = Number(req.params.habitId);
    const todoId = Number(req.params.todoId);

    const todo = await todoService.updateTodoOfHabit(
      habitId,
      todoId,
      req.body
    );

    res.json({
      success: true,
      message: "Todo of habit updated successfully!",
      data: todo
    });
  } catch (error) {
    logger.error("Error updating todo of habit: " + (error as Error).message);
    next(new ApiError(500, "Failed to update todo of habit", error));
  }
}


/**
 * update an existing todo belonging to event Y
 */
export const updateTodoOfEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventId = Number(req.params.eventId);
    const todoId = Number(req.params.todoId);

    const todo = await todoService.updateTodoOfEvent(
      eventId,
      todoId,
      req.body
    );

    res.json({
      success: true,
      message: "Todo of event updated successfully!",
      data: todo
    });

  } catch (error) {
    logger.error("Error updating todo of event: " + (error as Error).message);
    next(new ApiError(500, "Failed to update todo of event", error));
  }
};


/**
 * delete a todo (without relations)
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


/**
 * delete a todo belonging to habit X
 */
export const deleteTodoOfHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const habitId = Number(req.params.habitId);
    const todoId = Number(req.params.todoId);
    const todo = await todoService.deleteTodoOfHabit(habitId, todoId);

    res.json({
      success: true,
      message: "Todo of habit deleted successfully!",
      data: todo
    });
  } catch (error) {
    logger.error("Error deleting todo of habit: " + (error as Error).message);
    next(new ApiError(500, "Failed to delete todo of habit", error));
  }
};


/**
 * delete a todo belonging to event Y
 */
export const deleteTodoOfEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventId = Number(req.params.eventId);
    const todoId = Number(req.params.todoId);
    const todo = await todoService.deleteTodoOfEvent(eventId, todoId);

    res.json({
      success: true,
      message: "Todo of event deleted successfully!",
      data: todo
    });
  } catch (error) {
    logger.error("Error deleting todo of event: " + (error as Error).message);
    next(new ApiError(500, "Failed to delete todo of event", error));
  }
};
