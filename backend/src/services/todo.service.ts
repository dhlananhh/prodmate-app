import { prisma } from "../config/database"
import type { Todo, Prisma } from "../generated/prisma/client"


/**
 * get all todos (without relations)
 */
export const getAllTodos = async (): Promise<Todo[]> => {
  return prisma.todo.findMany({ orderBy: { created_at: "desc" } });
};


/**
 * get todo by id (without relations)
 */
export const getTodoById = async (id: number): Promise<Todo | null> => {
  return prisma.todo.findUnique({ where: { id } });
};


/**
 * get all todos in habit X
 */
export async function getTodosByHabit(habitId: number): Promise<Todo[]> {
  return prisma.todo.findMany({
    where: { habitId },
    include: { habit: true }
  })
}


/**
 * get a specific todo in habit X
 */
export async function getTodoByHabit(
  habitId: number,
  todoId: number
): Promise<Todo | null> {
  return prisma.todo.findFirst({
    where: { habitId, todoId },
    include: { habit: true }
  })
}


/**
 * get all todos in event Y
 */
export async function getTodosByEvent(eventId: number): Promise<Todo[]> {
  return prisma.todo.findMany({
    where: { eventId },
    include: { event: true }
  })
}


/**
 * get a specific todo in event Y
 */
export async function getTodoByEvent(eventId: number, todoId: number): Promise<Todo | null> {
  return prisma.todo.findFirst({
    where: { eventId, todoId },
    include: { event: true }
  })
}


/**
 * create a new todo (without relations)
 */
export const createTodo = async (
  data: {
    title: string;
    description?: string | null;
    deadline?: string | null;
    priority: string;
    status: string;
  }
): Promise<Todo> => {
  return prisma.todo.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      deadline: data.deadline ?? null,
      priority: data.priority,
      status: data.status,
    }
  });
}


/**
 * create a new todo belonging to habit X
 */
export async function createTodoForHabit(habitId: number, data: {
  title: string;
  description?: string | null;
  deadline?: string | null;
  priority: string;
  status: string;
}): Promise<Todo> {
  return prisma.todo.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      deadline: data.deadline ?? null,
      priority: data.priority,
      status: data.status,
      habit: {
        connect: { id: habitId }
      }
    }
  })
}


/**
 * create a new todo belonging to event Y
 */
export async function createTodoForEvent(eventId: number, data: {
  title: string;
  description?: string | null;
  deadline?: string | null;
  priority: string;
  status: string;
}): Promise<Todo> {
  return prisma.todo.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      deadline: data.deadline ?? null,
      priority: data.priority,
      status: data.status,
      event: {
        connect: { id: eventId }
      }
    }
  })
}


/**
 * update an existing todo (without relations)
 */
export const updateTodo = async (
  id: number,
  data: Prisma.TodoUpdateInput
): Promise<Todo> => {
  return prisma.todo.update({ where: { id }, data })
}


/**
 * update an existing todo belonging to habit X
 */
export async function updateTodoOfHabit(
  habitId: number,
  todoId: number,
  data: Prisma.TodoUpdateInput
): Promise<Todo> {
  return prisma.todo.update({
    where: { id: todoId },
    data: {
      ...data,
      habit: { connect: { id: habitId } }
    }
  })
}


/**
 * update an existing todo belonging to event Y
 */
export async function updateTodoOfEvent(
  eventId: number,
  todoId: number,
  data: Prisma.TodoUpdateInput
): Promise<Todo> {
  return prisma.todo.update({
    where: { id: todoId },
    data: {
      ...data,
      event: { connect: { id: eventId } }
    }
  });
}


/**
 * delete a todo (without relations)
 */
export const deleteTodo = async (id: number): Promise<Todo> => {
  return prisma.todo.delete({ where: { id } })
}


/**
 * delete a todo belonging to habit X
 */
export async function deleteTodoOfHabit(
  habitId: number,
  todoId: number
): Promise<Todo> {
  const todo = await prisma.todo.findFirst({
    where: { id: todoId, habitId }
  });

  if (!todo) {
    throw new Error("Todo not found in habit");
  };

  return prisma.todo.delete({
    where: { id: todoId }
  });
}


/**
 * delete a todo belonging to event Y
 */
export async function deleteTodoOfEvent(
  eventId: number,
  todoId: number
): Promise<Todo> {
  const todo = await prisma.todo.findFirst({
    where: { id: todoId, eventId }
  });

  if (!todo) {
    throw new Error("Todo not found in event");
  };

  return prisma.todo.delete({
    where: { id: todoId }
  });
}
