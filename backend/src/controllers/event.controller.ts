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
 * get all events
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
 * get a single event by id
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
 * create a new event
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
      date: new Date(parsed.data.date),
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
 * update an existing event
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
 * delete an event
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
