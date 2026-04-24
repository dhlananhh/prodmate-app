import { z } from "zod";


/**
 * Enums
 */
export enum TodoPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum TodoStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}


/**
 * Base schema for a Todo item
 */
export const todoBaseSchema = z.object({
  title: z.string()
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title must be at most 255 characters long."),
  description: z.string().optional(),
  deadline: z.string()
    .refine((val) => !isNaN(Date.parse(val)), {
      error: "Deadline must be a valid ISO date string",
    })
    .optional(),
  priority: z.enum(TodoPriority).default(TodoPriority.MEDIUM),
  status: z.enum(TodoStatus).default(TodoStatus.PENDING),
})


/**
 * Schema for creating a new Todo
 */
export const createTodoSchema = todoBaseSchema;


/**
 * Schema for updating an existing Todo
 * - all fields optional, but must respect constraints if provided
 */
export const updateTodoSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  deadline: z.string()
    .refine((val) => !isNaN(Date.parse(val)), {
      error: "Deadline must be a valid ISO date string",
    })
    .optional(),
  priority: z.enum(TodoPriority).optional(),
  status: z.enum(TodoStatus).optional(),
})


/**
 * Schema for validating Todo ID (usually from params)
 */
export const todoIdSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { error: "ID must be a numeric string" })
})


/**
 * Types inferred from schemas
 */
export type TodoBase = z.infer<typeof todoBaseSchema>;
export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type TodoIdParam = z.infer<typeof todoIdSchema>;
