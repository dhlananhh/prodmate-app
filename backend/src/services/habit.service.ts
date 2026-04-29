import { prisma } from "../config/database"
import { Habit, Prisma } from "../generated/prisma/client"


/**
 * get all habits (without relations)
 */
export const getAllHabits = async (): Promise<Habit[]> => {
  return prisma.habit.findMany({
    orderBy: { createdAt: "desc" }
  });
};


/**
 * get all habits with todos
 */
export const getAllHabitsWithTodos = async (): Promise<Habit[]> => {
  return prisma.habit.findMany({
    orderBy: { createdAt: "desc" },
    include: { todos: true }
  })
}


/**
 * get all habits with todos
 */
export const getAllHabitsWithEvents = async (): Promise<Habit[]> => {
  return prisma.habit.findMany({
    orderBy: { createdAt: "desc" },
    include: { events: true }
  });
}


/**
 * get a specific habit by id (without relations)
 */
export const getHabitById = async (id: number): Promise<Habit | null> => {
  return prisma.habit.findUnique({ where: { id } });
};


/**
 * get a specific habit with todos by id
 */
export const getHabitWithTodosById = async (id: number): Promise<Habit | null> => {
  return prisma.habit.findUnique({
    where: { id },
    include: { todos: true }
  })
}


/**
 * get a specific habit with events by id
 */
export const getHabitWithEventsById = async (id: number): Promise<Habit | null> => {
  return prisma.habit.findUnique({
    where: { id },
    include: { events: true }
  });
};


/**
 * create a new habit (without relations)
 */
export const createHabit = async (data: {
  name: string;
  description?: string | null;
  frequency: string;
  status: string;
  startDate?: Date | null;
  endDate?: Date | null;
}): Promise<Habit> => {
  return prisma.habit.create({ data });
};


/**
 * create a new habit with an initial todo
 */
export const createHabitWithTodo = async (
  habitData: {
    name: string;
    description?: string | null;
    frequency: string;
    status: string;
    startDate?: Date | null;
    endDate?: Date | null;
  },
  todoData: {
    title: string;
    description?: string | null;
    deadline?: Date | null;
    priority: string;
    status: string;
  }
): Promise<Habit> => {
  return prisma.habit.create({
    data: {
      ...habitData,
      todos: {
        create: todoData
      },
    },
    include: { todos: true },
  });
}


/**
 * create a new habit with an initial event
 */
export const createHabitWithEvent = async (
  habitData: {
    name: string;
    description?: string | null;
    frequency: string;
    status: string;
    startDate?: Date | null;
    endDate?: Date | null;
  },
  eventData: {
    title: string;
    description?: string | null;
    date: Date;
    type: string;
    status: string;
    location: string | null;
    notes: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
  }
): Promise<Habit> => {
  return prisma.habit.create({
    data: {
      ...habitData,
      events: {
        create: eventData
      },
    },
    include: { events: true },
  });
}


/**
 * update an existing habit (without relations)
 */
export const updateHabit = async (
  id: number,
  data: Prisma.HabitUpdateInput
): Promise<Habit> => {
  return prisma.habit.update({ where: { id }, data });
};


/**
 * update an existing habit with todos
 */
export const updateHabitWithTodos = async (
  id: number,
  data: Prisma.HabitUpdateInput
): Promise<Habit> => {
  return prisma.habit.update({
    where: { id },
    data,
    include: { todos: true },
  });
};


/**
 * update an existing habit with events
 */
export const updateHabitWithEvents = async (
  id: number,
  data: Prisma.HabitUpdateInput
): Promise<Habit> => {
  return prisma.habit.update({
    where: { id },
    data,
    include: { events: true },
  });
};


/**
 * delete a habit (without relations)
 */
export const deleteHabit = async (id: number): Promise<Habit> => {
  return prisma.habit.delete({ where: { id } });
};


/**
 * delete a habit with todos
 */
export const deleteHabitWithTodos = async (id: number): Promise<Habit> => {
  return prisma.habit.delete({
    where: { id },
    include: { todos: true },
  });
};


/**
 * delete a habit with events
 */
export const deleteHabitWithEvents = async (id: number): Promise<Habit> => {
  return prisma.habit.delete({
    where: { id },
    include: { events: true },
  });
};
