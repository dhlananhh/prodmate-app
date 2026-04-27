import { Router } from "express";
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  createTodoForHabit,
  createTodoForEvent,
  updateTodoOfHabit,
  updateTodoOfEvent,
  deleteTodoOfHabit,
  deleteTodoOfEvent
} from "../controllers/todo.controller";

const router = Router();


/**
 * @openapi
 * /todos:
 *   get:
 *     summary: Retrieve all todos
 *     tags:
 *       - Todos
 *     responses:
 *       200:
 *         description: A list of todos
 *   post:
 *     summary: Create a standalone todo
 *     tags:
 *       - Todos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       201:
 *         description: Todo created successfully
 *
 * /todos/{id}:
 *   get:
 *     summary: Retrieve a todo by ID
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo details
 *       404:
 *         description: Todo not found
 *   put:
 *     summary: Update a standalone todo by ID
 *     tags:
 *       - Todos
 *   delete:
 *     summary: Delete a standalone todo by ID
 *     tags:
 *       - Todos
 *
 * /habits/{habitId}/todos:
 *   post:
 *     summary: Create a todo linked to a specific habit
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: habitId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       201:
 *         description: Todo for habit created successfully
 *
 * /habits/{habitId}/todos/{todoId}:
 *   put:
 *     summary: Update a todo linked to a specific habit
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: habitId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo of habit updated successfully
 *       404:
 *         description: Todo not found in habit
 *   delete:
 *     summary: Delete a todo linked to a specific habit
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: habitId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Todo of habit deleted successfully
 *       404:
 *         description: Todo not found in habit
 *
 * /events/{eventId}/todos:
 *   post:
 *     summary: Create a todo linked to a specific event
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       201:
 *         description: Todo for event created successfully
 *
 * /events/{eventId}/todos/{todoId}:
 *   put:
 *     summary: Update a todo linked to a specific event
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo of event updated successfully
 *       404:
 *         description: Todo not found in event
 *   delete:
 *     summary: Delete a todo linked to a specific event
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Todo of event deleted successfully
 *       404:
 *         description: Todo not found in event
 */


// get all todos
// GET /api/todos
router.get("/", getAllTodos);

// get a single todo by id
// GET /api/todos/:id
router.get("/:id", getTodoById);

// create a new todo
// POST /api/todos
router.post("/", createTodo);

// POST /api/habits/:habitId/todos (create a new todo for habit X)
router.post("/habits/:habitId/todos", createTodoForHabit);

// POST /api/events/:eventId/todos (create a new todo for event Y)
router.post("/events/:eventId/todos", createTodoForEvent);

// update an existing todo by id
// PUT /api/todos/:id
router.put("/:id", updateTodo);

// PUT /api/habits/:habitId/todos/:todoId (update an existing todo for habit X)
router.put("/habits/:habitId/todos/:todoId", updateTodoOfHabit);

// PUT /api/events/:eventId/todos/:todoId (update an existing todo for event Y)
router.put("/events/:eventId/todos/:todoId", updateTodoOfEvent);

// delete a todo by id
// DELETE /api/todos/:id
router.delete("/:id", deleteTodo);

// DELETE /api/habits/:habitId/todos/:todoId (delete a todo for habit X)
router.delete("/habits/:habitId/todos/:todoId", deleteTodoOfHabit);

// DELETE /api/events/:eventId/todos/:todoId (delete a todo for event Y)
router.delete("/events/:eventId/todos/:todoId", deleteTodoOfEvent);


export default router;
