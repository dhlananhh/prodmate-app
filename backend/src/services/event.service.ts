import { prisma } from "../config/database"
import { Event } from "../generated/prisma/client"


/**
 * get all events (without relations)
 */
export const getAllEvents = async (): Promise<Event[]> => {
  return prisma.event.findMany({ orderBy: { date: "asc" } });
};


/**
 * get all events with todos
 */
export const getAllEventsWithTodos = async (): Promise<Event[]> => {
  return prisma.event.findMany({
    orderBy: { date: "asc" },
    include: { todos: true },
  })
}


/**
 * get al events with habit
 */
export const getAllEventsWithHabit = async (): Promise<Event[]> => {
  return prisma.event.findMany({
    orderBy: { date: "asc" },
    include: { habit: true }
  });
};


/**
 * get a specific event by id (without relations)
 */
export const getEventById = async (id: number): Promise<Event | null> => {
  return prisma.event.findUnique({ where: { id } });
};


/**
 * get a specific event with todos by id
 */
export const getEventWithTodosById = async (id: number): Promise<Event | null> => {
  return prisma.event.findUnique({
    where: { id },
    include: { todos: true }
  });
};


/**
 * get a specific event with habit by id
 */
export const getEventWithHabitById = async (id: number): Promise<Event | null> => {
  return prisma.event.findUnique({
    where: { id },
    include: { habit: true }
  });
};


/**
 * create a new event (without relations)
 */
export const createEvent = async (data: {
  title: string;
  description?: string | null;
  date: Date;
  type: string;
  status: string;
  location: string | null;
  notes: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
}): Promise<Event> => {
  return prisma.event.create({ data });
};


/**
 * update an existing event (without relations)
 */
export const updateEvent = async (
  id: number,
  data: Partial<Event>
): Promise<Event> => {
  return prisma.event.update({ where: { id }, data });
};


/**
 * update an existing event with todos
 */
export const updateEventWithTodos = async (
  id: number,
  data: Partial<Event>
): Promise<Event> => {
  return prisma.event.update({
    where: { id },
    data,
    include: { todos: true }
  });
}


/**
 * update an existing event with habit
 */
export const updateEventWithHabit = async (
  id: number,
  data: Partial<Event>
): Promise<Event> => {
  return prisma.event.update({
    where: { id },
    data,
    include: { habit: true }
  });
}


/**
 * delete an event (without relations)
 */
export const deleteEvent = async (id: number): Promise<Event> => {
  return prisma.event.delete({ where: { id } });
};


/**
 * delete an event with todos
 */
export const deleteEventWithTodos = async (id: number): Promise<Event> => {
  return prisma.event.delete({
    where: { id },
    include: { todos: true }
  });
};


/**
 * delete an event with habit
 */
export const deleteEventWithHabit = async (id: number): Promise<Event> => {
  return prisma.event.delete({
    where: { id },
    include: { habit: true }
  });
};
