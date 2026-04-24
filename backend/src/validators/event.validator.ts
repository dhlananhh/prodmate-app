import { z } from "zod";


/**
 * Enums
 */
export enum EventStatus {
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  COMPLETED = "completed",
}

export enum EventFrequency {
  ONCE = "once",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}

export enum EventType {
  STUDY = "study",
  WORK = "work",
  PERSONAL = "personal",
  OTHER = "other",
}


/**
 * Base schema for an Event item
 * - Check the logic: endDate must be after startDate.
 */
export const eventBaseSchema = z.object({
  title: z.string()
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title must be at most 255 characters long."),
  description: z.string().optional(),
  date: z.string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Date must be a valid ISO date string",
    }),
  type: z.enum(EventType).default(EventType.OTHER),
  frequency: z.enum(EventFrequency).default(EventFrequency.ONCE),
  startDate: z.string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Start date must be a valid ISO date string",
    })
    .optional(),
  endDate: z.string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "End date must be a valid ISO date string",
    })
    .optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(EventStatus).default(EventStatus.UPCOMING),
}).superRefine((data, ctx) => {
  if (data.startDate && data.endDate) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    if (end <= start) {
      ctx.addIssue({
        code: "custom",
        path: [ "endDate" ],
        message: "End date must be after start date",
      })
    }
  }
});


/**
 * Schema for creating a new Event
 */
export const createEventSchema = eventBaseSchema;


/**
 * Schema for updating an existing Event
 * - all fields optional, but must respect constraints if provided
 * - Check the logic: endDate must be after startDate.
 */
export const updateEventSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  date: z.string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Date must be a valid ISO date string",
    })
    .optional(),
  type: z.enum(EventType).optional(),
  startDate: z.string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Start date must be a valid ISO date string",
    })
    .optional(),
  endDate: z.string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "End date must be a valid ISO date string",
    })
    .optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(EventStatus).optional(),
  frequency: z.enum(EventFrequency).optional(),
}).superRefine((data, ctx) => {
  if (data.startDate && data.endDate) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    if (end <= start) {
      ctx.addIssue({
        code: "custom",
        path: [ "endDate" ],
        message: "End date must be after start date",
      })
    }
  }
});


/**
 * Schema for validating Event ID (usually from params)
 */
export const eventIdSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: "ID must be a numeric string" }),
});


/**
 * Types inferred from schemas
 */
export type EventBase = z.infer<typeof eventBaseSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type EventIdParam = z.infer<typeof eventIdSchema>;
