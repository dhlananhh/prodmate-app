import { Router } from "express";
import {
  createHabit,
  createHabitWithEvent,
  createHabitWithTodo,
  deleteHabit,
  deleteHabitWithEvents,
  deleteHabitWithTodos,
  getAllHabits,
  getAllHabitsWithEvents,
  getAllHabitsWithTodos,
  getHabitById,
  getHabitWithEventsById,
  getHabitWithTodosById,
  updateHabit,
  updateHabitWithEvents,
  updateHabitWithTodos
} from "../controllers/habit.controller";


const router = Router();


/**
 * @openapi
 * /habits:
 *   get:
 *     summary: Retrieve all habits (without relations)
 *     tags:
 *       - Habits
 *     responses:
 *       200:
 *         description: A list of habits
 *   post:
 *     summary: Create a new habit
 *     tags:
 *       - Habits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HabitInput'
 *     responses:
 *       201:
 *         description: Habit created successfully
 *
 * /habits/{id}:
 *   get:
 *     summary: Retrieve a habit by ID
 *     tags:
 *       - Habits
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Habit details
 *       404:
 *         description: Habit not found
 *   put:
 *     summary: Update a habit by ID
 *     tags:
 *       - Habits
 *   delete:
 *     summary: Delete a habit by ID
 *     tags:
 *       - Habits
 *
 * /habits/todos:
 *   get:
 *     summary: Retrieve all habits with their todos
 *     tags:
 *       - Habits
 *     responses:
 *       200:
 *         description: A list of habits with todos
 *
 * /habits/{id}/todos:
 *   get:
 *     summary: Retrieve a habit with its todos by ID
 *     tags:
 *       - Habits
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *   post:
 *     summary: Create a habit with an initial todo
 *     tags:
 *       - Habits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HabitWithTodoInput'
 *   put:
 *     summary: Update a habit with todos
 *     tags:
 *       - Habits
 *   delete:
 *     summary: Delete a habit with todos
 *     tags:
 *       - Habits
 *
 * /habits/events:
 *   get:
 *     summary: Retrieve all habits with their events
 *     tags:
 *       - Habits
 *     responses:
 *       200:
 *         description: A list of habits with events
 *
 * /habits/{id}/events:
 *   get:
 *     summary: Retrieve a habit with its events by ID
 *     tags:
 *       - Habits
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *   post:
 *     summary: Create a habit with an initial event
 *     tags:
 *       - Habits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HabitWithEventInput'
 *   put:
 *     summary: Update a habit with events
 *     tags:
 *       - Habits
 *   delete:
 *     summary: Delete a habit with events
 *     tags:
 *       - Habits
 */



// ========================================

/**
 * HABIT CRUD (without relations)
 */

// Get all habits
// GET /api/habits
router.get("/", getAllHabits);

// Get a single habit by ID
// GET /api/habits/:id
router.get("/:id", getHabitById);

// Create a new habit
// POST /api/habits
router.post("/", createHabit);

// Update a habit
// PUT /api/habits/:id
router.put("/:id", updateHabit);

// Delete a habit
// DELETE /api/habits/:id
router.delete("/:id", deleteHabit);


// ========================================

/**
 * HABITS with TODOS
 */
router.get("/habits/todos", getAllHabitsWithTodos);
router.get("/habits/:id/todos", getHabitWithTodosById);
router.post("/habits/:id/todos", createHabitWithTodo);
router.put("/habits/:id/todos", updateHabitWithTodos);
router.delete("/habits/:id/todos", deleteHabitWithTodos);


// ========================================

/**
 * HABITS with EVENT
 */
router.get("/habits/events", getAllHabitsWithEvents);
router.get("/habits/:id/events", getHabitWithEventsById);
router.post("/habits/:id/events", createHabitWithEvent);
router.put("/habits/:id/events", updateHabitWithEvents);
router.delete("/habits/:id/events", deleteHabitWithEvents);


export default router;
