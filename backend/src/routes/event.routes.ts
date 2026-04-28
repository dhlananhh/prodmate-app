import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  deleteEventWithHabit,
  deleteEventWithTodos,
  getAllEvents,
  getAllEventsWithHabit,
  getAllEventsWithTodos,
  getEventById,
  getEventWithHabitById,
  getEventWithTodosById,
  updateEvent,
  updateEventWithHabit,
  updateEventWithTodos
} from "../controllers/event.controller";


const router = Router();


/**
 * @openapi
 * /events:
 *   get:
 *     summary: Retrieve all events
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: A list of events
 *   post:
 *     summary: Create a new event
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       201:
 *         description: Event created successfully
 *
 * /events/{id}:
 *   get:
 *     summary: Retrieve an event by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 *   put:
 *     summary: Update an event by ID
 *     tags:
 *       - Events
 *   delete:
 *     summary: Delete an event by ID
 *     tags:
 *       - Events
 *
 * /events/todos:
 *   get:
 *     summary: Retrieve all events with their todos
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: A list of events with todos
 *
 * /events/{id}/todos:
 *   get:
 *     summary: Retrieve a specific event with its todos
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event with todos details
 *       404:
 *         description: Event not found
 *
 * /events/habit:
 *   get:
 *     summary: Retrieve all events with their linked habit
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: A list of events with habit relation
 *
 * /events/{id}/habit:
 *   get:
 *     summary: Retrieve a specific event with its linked habit
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event with habit details
 *       404:
 *         description: Event not found
 * 
 * /events/{id}/todos:
 *   put:
 *     summary: Update an event with its todos
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       200:
 *         description: Event with todos updated successfully
 *       404:
 *         description: Event not found
 *   delete:
 *     summary: Delete an event with its todos
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event with todos deleted successfully
 *       404:
 *         description: Event not found
 *
 * /events/{id}/habit:
 *   put:
 *     summary: Update an event with its linked habit
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       200:
 *         description: Event with habit updated successfully
 *       404:
 *         description: Event not found
 *   delete:
 *     summary: Delete an event with its linked habit
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event with habit deleted successfully
 *       404:
 *         description: Event not found
 */


// ========================================

/**
 * EVENTS CRUD (without relations)
 */

// Get all events
// GET /api/events
router.get("/", getAllEvents);

// Get a single event by ID
// GET /api/events/:id
router.get("/:id", getEventById);

// Create a new event
// POST /api/events
router.post("/", createEvent);

// Update an event
// PUT /api/events/:id
router.put("/:id", updateEvent);

// Delete an event
// DELETE /api/events/:id
router.delete("/:id", deleteEvent);


// ========================================

/**
 * EVENTS with TODOS
 */

// GET /api/events/todos
router.get("/events/todos", getAllEventsWithTodos);

// GET /api/events/:id/todos
router.get("/events/:id/todos", getEventWithTodosById);

// PUT /api/events/:id/todos
router.put("/events/:id/todos", updateEventWithTodos);

// DELETE /api/events/:id/todos
router.delete("/events/:id/todos", deleteEventWithTodos);


// ========================================

/**
 * EVENTS with HABIT
 */

// GET /api/events/habit
router.get("/events/habit", getAllEventsWithHabit);

// GET /api/events/:id/habit
router.get("/events/:id/habit", getEventWithHabitById);

// PUT /api/events/:id/habit
router.put("/events/:id/habit", updateEventWithHabit);

// DELETE /api/events/:id/habit
router.delete("/events/:id/habit", deleteEventWithHabit);


export default router;
