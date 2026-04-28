import {
  NextFunction,
  Request,
  Response
} from "express";
import * as eventService from "../services/event.service";
import { logger } from "../config/logger";
import { ApiError } from "../utils/ApiError";
import { Event } from "../generated/prisma/client";
import {
  createEventSchema,
  eventIdSchema,
  updateEventSchema
} from "../validators/event.validator";


/**
 * get all events (without relations)
 */
export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events: Event[] = await eventService.getAllEvents();
    res.json({
      success: true,
      message: "List of events fetched successfully!",
      data: events
    });
  } catch (error) {
    logger.error("Error fetching events: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch events", error));
  }
}


/**
 * get all events with todos
 */
export const getAllEventsWithTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await eventService.getAllEventsWithTodos();
    res.json({
      success: true,
      message: "List of events with todos fetched successfully!",
      data: events
    });
  } catch (error) {
    logger.error("Error fetching events with todos: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch events with todos", error));
  }
}


/**
 * get all events with habit 
 */
export const getAllEventsWithHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await eventService.getAllEventsWithHabit();
    res.json({
      success: true,
      message: "List of events with habit fetched successfully!",
      data: events
    });
  } catch (error) {
    logger.error("Error fetching events with habit: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch events with habit", error));
  }
};


/**
 * get a specific event by id (without relations)
 */
export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParsed = eventIdSchema.safeParse(req.params);
    if (!idParsed.success) {
      return res.status(400).json({
        success: false,
        errors: idParsed.error.message
      });
    }

    const event: Event | null = await eventService.getEventById((Number(idParsed.data.id)));
    if (!event) {
      return res.status(404).json({
        success: false,
        error: {
          message: "Event not found!"
        }
      })
    }

    res.json({
      success: true,
      message: "Event fetched successfully!",
      data: event
    })
  } catch (error) {
    logger.error("Error fetching event: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch event", error));
  }
}


/**
 * get a specific event with todos by id
 */
export const getEventWithTodosById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParsed = eventIdSchema.safeParse(req.params);
    if (!idParsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
        errors: idParsed.error.message
      });
    }

    const event = await eventService.getEventWithTodosById(Number(idParsed.data.id));
    if (!event) {
      return res.status(404).json({
        success: false,
        error: {
          message: "Event not found"
        }
      });
    }

    res.json({
      success: true,
      message: "Event with todos fetched successfully!",
      data: event
    });
  } catch (error) {
    logger.error("Error fetching event with todos: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch event with todos", error));
  }
}


/**
 * get a specific event with habit by id
 */
export const getEventWithHabitById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParsed = eventIdSchema.safeParse(req.params);
    if (!idParsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
        errors: idParsed.error.message
      });
    }

    const event = await eventService.getEventWithHabitById(Number(idParsed.data.id));
    if (!event) {
      return res.status(404).json({
        success: false,
        error: {
          message: "Event not found"
        }
      });
    }

    res.json({
      success: true,
      message: "Event with habit fetched successfully!",
      data: event
    });
  } catch (error) {
    logger.error("Error fetching event with habit: " + (error as Error).message);
    next(new ApiError(500, "Failed to fetch event with habit", error));
  }
}


/**
 * create a new event (without relations)
 */
export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = createEventSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.message
      });
    }

    const eventData = {
      title: parsed.data.title,
      date: new Date(parsed.data.date!),
      type: parsed.data.type,
      frequency: parsed.data.frequency,
      status: parsed.data.status,
      description: parsed.data.description ?? null,
      startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : null,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
      location: parsed.data.location ?? null,
      notes: parsed.data.notes ?? null
    };

    const event: Event = await eventService.createEvent(eventData);
    res.status(201).json({
      success: true,
      message: "Event created successfully!",
      data: event
    });
  } catch (error) {
    logger.error("Error creating event: " + (error as Error).message);
    next(new ApiError(500, "Failed to create event", error));
  }
};


/**
 * update an existing event (without relations)
 */
export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParsed = eventIdSchema.safeParse(req.params);
    if (!idParsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
        errors: idParsed.error.message
      });
    }

    const bodyParsed = updateEventSchema.safeParse(req.body);
    if (!bodyParsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: bodyParsed.error.message
      });
    }

    const eventData = {
      ...bodyParsed.data,
      date: bodyParsed.data.date ? new Date(bodyParsed.data.date) : undefined,
      startDate: bodyParsed.data.startDate ? new Date(bodyParsed.data.startDate) : undefined,
      endDate: bodyParsed.data.endDate ? new Date(bodyParsed.data.endDate) : undefined
    };

    const event: Event = await eventService.updateEvent(
      Number(idParsed.data.id),
      eventData
    );

    res.json({
      success: true,
      message: "Event updated successfully!",
      data: event
    })
  } catch (error) {
    logger.error("Error updating event: " + (error as Error).message);
    next(new ApiError(500, "Failed to update event", error));
  }
}


/**
 * update an existing event with todos
 */
export const updateEventWithTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParsed = eventIdSchema.safeParse(req.params);
    if (!idParsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
        errors: idParsed.error.message
      });
    }

    const bodyParsed = updateEventSchema.safeParse(req.body);
    if (!bodyParsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: bodyParsed.error.message
      });
    }

    const eventData = {
      ...bodyParsed.data,
      date: bodyParsed.data.date ? new Date(bodyParsed.data.date) : undefined,
      startDate: bodyParsed.data.startDate ? new Date(bodyParsed.data.startDate) : undefined,
      endDate: bodyParsed.data.endDate ? new Date(bodyParsed.data.endDate) : undefined
    };

    const event = await eventService.updateEventWithTodos(
      Number(idParsed.data.id),
      eventData
    );

    res.json({
      success: true,
      message: "Event with todos updated successfully!",
      data: event
    });
  } catch (error) {
    logger.error("Error updating event with todos: " + (error as Error).message);
    next(new ApiError(500, "Failed to update event with todos", error));
  }
}


/**
 * update an existing event with habit
 */
export const updateEventWithHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParsed = eventIdSchema.safeParse(req.params);
    if (!idParsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
        errors: idParsed.error.message
      });
    }

    const bodyParsed = updateEventSchema.safeParse(req.body);
    if (!bodyParsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: bodyParsed.error.message
      });
    }

    const eventData = {
      ...bodyParsed.data,
      date: bodyParsed.data.date ? new Date(bodyParsed.data.date) : undefined,
      startDate: bodyParsed.data.startDate ? new Date(bodyParsed.data.startDate) : undefined,
      endDate: bodyParsed.data.endDate ? new Date(bodyParsed.data.endDate) : undefined
    };

    const event = await eventService.updateEventWithHabit(
      Number(idParsed.data.id),
      eventData
    );

    res.json({
      success: true,
      message: "Event with habit updated successfully!",
      data: event
    });
  } catch (error) {
    logger.error("Error updating event with habit: " + (error as Error).message);
    next(new ApiError(500, "Failed to update event with habit", error));
  }
};


/**
 * delete an event (without relations)
 */
export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParsed = eventIdSchema.safeParse(req.params);
    if (!idParsed.success) {
      return res.status(400).json({
        success: false,
        errors: idParsed.error.message
      });
    }

    const event: Event = await eventService.deleteEvent(Number(idParsed.data.id));
    res.json({
      success: true,
      message: "Event deleted successfully!",
      data: event
    });
  } catch (error) {
    logger.error("Error deleting event: " + (error as Error).message);
    next(new ApiError(500, "Failed to delete event", error));
  }
};


/**
 * delete an event with todos
 */
export const deleteEventWithTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParsed = eventIdSchema.safeParse(req.params);
    if (!idParsed.success) {
      return res.status(400).json({
        success: false,
        errors: idParsed.error.message
      });
    }

    const event = await eventService.deleteEventWithTodos(Number(idParsed.data.id));
    res.json({
      success: true,
      message: "Event with todos deleted successfully!",
      data: event
    });
  } catch (error) {
    logger.error("Error deleting event with todos: " + (error as Error).message);
    next(new ApiError(500, "Failed to delete event with todos", error));
  }
};


/**
 * delete an event with habit
 */
export const deleteEventWithHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idParsed = eventIdSchema.safeParse(req.params);
    if (!idParsed.success) {
      return res.status(400).json({
        success: false,
        errors: idParsed.error.message
      });
    }

    const event = await eventService.deleteEventWithHabit(Number(idParsed.data.id));
    res.json({
      success: true,
      message: "Event with habit deleted successfully!",
      data: event
    });
  } catch (error) {
    logger.error("Error deleting event with habit: " + (error as Error).message);
    next(new ApiError(500, "Failed to delete event with habit", error));
  }
};
