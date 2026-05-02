import { prisma } from "../config/database";
import type {
  User,
  Prisma
} from "../generated/prisma/client";
import {
  hashPassword,
  verifyPassword
} from "../config/password";
import { signToken } from "../config/jwt";


/**
 * get all users (without relations)
 */
export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  })
}


/**
 * get a specific user by id (without relations)
 */
export const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};


/**
 * register a new user
 */
export const registerUser = async (
  data: {
    email: string;
    username: string;
    password: string;
    name?: string | null;
  }
): Promise<User> => {
  const existing = await prisma.user.findFirst({
    where: {
      OR: [
        { email: data.email },
        { username: data.username }
      ]
    }
  });

  if (existing) {
    throw new Error("Email or username already registered");
  }

  const hashed = await hashPassword(data.password);

  return prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      password: hashed,
      name: data.name ?? null
    }
  });
}


/**
 * login a user
 */
export const loginUser = async (
  identifier: string,
  password: string
): Promise<{
  user: User;
  accessToken: string;
  refreshToken: string
}> => {
  // identifier can be either an email or a username
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier },
        { username: identifier }
      ]
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  const match = await verifyPassword(password, user.password);
  if (!match) {
    throw new Error("Invalid credentials");
  }

  const accessToken = signToken(
    { id: user.id, email: user.email },
    { expiresIn: "45m" }
  );

  const refreshToken = signToken(
    { id: user.id },
    { expiresIn: "7d" }
  )

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });

  return {
    user,
    accessToken,
    refreshToken
  }
}


/**
 * get user profile (without password)
 */
export const getUserProfile = async (id: number): Promise<Partial<User> | null> => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      role: true,
      createdAt: true,
    }
  });
}


/**
 * refresh access token using refresh token
 */
export async function refreshAccessToken(refreshToken: string) {
  const stored = await prisma.refreshToken.findUnique({
    where: {
      token: refreshToken
    }
  });

  if (!stored || stored.expiresAt < new Date()) {
    throw new Error("Refresh token invalid or expired");
  }

  const accessToken = signToken(
    { id: stored.userId },
    { expiresIn: "15m" }
  );

  return { accessToken };
}
