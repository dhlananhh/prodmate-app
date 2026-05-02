import { z } from "zod";


/**
 * Schema for user registration
 * - Requires email, username, and password
 * - Optional name field
 */
export const registerSchema = z.object({
  email: z.email("Invalid email format"),
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be at most 50 characters long"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must be at most 128 characters long"),
  name: z.string().optional()
});


/**
 * Schema for user login
 * - Accepts identifier (email or username) and password
 */
export const loginSchema = z.object({
  identifier: z.string()
    .min(3, "Identifier must be at least 3 characters")
    .max(255, "Identifier too long! Identifier must be at most 255 characters long"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must be at most 128 characters long")
});


/**
 * Schema for refresh token request
 * - Requires refreshToken string
 */
export const refreshSchema = z.object({
  refreshToken: z.string().min(10, "Refresh token must be at least 10 characters")
});


/**
 * Schema for forgot password
 */
export const forgotSchema = z.object({
  email: z.email("Invalid email format")
});


/**
 * Schema for reset password
 */
export const resetSchema = z.object({
  token: z.string().min(10, "Reset token must be valid"),
  newPassword: z.string().min(8, "Password must be at least 8 characters")
});


/**
 * Types inferred from schemas
 */
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;
export type ForgotInput = z.infer<typeof forgotSchema>;
export type ResetInput = z.infer<typeof resetSchema>;
