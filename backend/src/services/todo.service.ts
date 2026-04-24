import { prisma } from "../config/database"
import { Todo } from "../generated/prisma/client"

export const getAllTodos = async (): Promise<Todo[]> => {
  return prisma.todo.findMany({ orderBy: { created_at: "desc" } });
};

export const getTodoById = async (id: number): Promise<Todo | null> => {
  return prisma.todo.findUnique({ where: { id } });
};

export const createTodo = async (
  data: Omit<Todo, "id" | "created_at" | "updated_at">
): Promise<Todo> => {
  return prisma.todo.create({ data })
}

export const updateTodo = async (
  id: number,
  data: Partial<Todo>
): Promise<Todo> => {
  return prisma.todo.update({ where: { id }, data })
}

export const deleteTodo = async (id: number): Promise<Todo> => {
  return prisma.todo.delete({ where: { id } })
}
