import { prisma } from "../config/database"
import { Habit } from "../generated/prisma/client"

export const getAllHabits = async (): Promise<Habit[]> => {
  return prisma.habit.findMany({ orderBy: { created_at: "desc" } });
};

export const getHabitById = async (id: number): Promise<Habit | null> => {
  return prisma.habit.findUnique({ where: { id } });
};

export const createHabit = async (data: Omit<Habit, "id" | "created_at" | "updated_at">): Promise<Habit> => {
  return prisma.habit.create({ data });
};

export const updateHabit = async (id: number, data: Partial<Habit>): Promise<Habit> => {
  return prisma.habit.update({ where: { id }, data });
};

export const deleteHabit = async (id: number): Promise<Habit> => {
  return prisma.habit.delete({ where: { id } });
};
