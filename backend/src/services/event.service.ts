import { prisma } from "../config/database"
import { Event } from "../generated/prisma/client"

export const getAllEvents = async (): Promise<Event[]> => {
  return prisma.event.findMany({ orderBy: { date: "asc" } });
};

export const getEventById = async (id: number): Promise<Event | null> => {
  return prisma.event.findUnique({ where: { id } });
};

export const createEvent = async (data: Omit<Event, "id" | "created_at" | "updated_at">): Promise<Event> => {
  return prisma.event.create({ data });
};

export const updateEvent = async (id: number, data: Partial<Event>): Promise<Event> => {
  return prisma.event.update({ where: { id }, data });
};

export const deleteEvent = async (id: number): Promise<Event> => {
  return prisma.event.delete({ where: { id } });
};
