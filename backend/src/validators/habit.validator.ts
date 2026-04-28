import { z } from "zod";


/**
 * Enums
 */
export enum HabitFrequency {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}

export enum HabitStatus {
  ACTIVE = "active",
  PAUSED = "paused",
  COMPLETED = "completed",
}


/**
 * Base schema for a Habit item
 */
export const habitBaseSchema = z.object({
  name: z.string()
    .min(3, "Habit name must be at least 3 characters")
    .max(255, "Habit name must be at most 255 characters long"),
  description: z.string().optional(),
  frequency: z.enum(HabitFrequency).default(HabitFrequency.DAILY),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  status: z.enum(HabitStatus).default(HabitStatus.ACTIVE),
});


/**
 * Schema for creating a new Habit
 */
export const createHabitSchema = habitBaseSchema;


/**
 * Schema for updating an existing Habit
 * - all fields optional, but must respect constraints if provided
 */
export const updateHabitSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().optional(),
  frequency: z.enum(HabitFrequency).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  status: z.enum(HabitStatus).optional(),
})


/**
 * Schema for validating Habit ID (usually from params)
 */
export const habitIdSchema = z.object({
  id: z.string().regex(/^\d+$/, { error: "ID must be a numeric string" }),
})


/**
 * Types inferred from schemas
 */
export type HabitBase = z.infer<typeof habitBaseSchema>;
export type CreateHabitInput = z.infer<typeof createHabitSchema>;
export type UpdateHabitInput = z.infer<typeof updateHabitSchema>;
export type HabitIdParam = z.infer<typeof habitIdSchema>;
