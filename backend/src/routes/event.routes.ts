import {
  Router,
  Request,
  Response
} from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent
} from "../controllers/event.controller";

const router = Router();


/**
 * @openapi
 * /events:
 *   get:
 *     summary: Lấy danh sách tất cả events
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: Danh sách events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *   post:
 *     summary: Tạo mới một event
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
 *         description: Event được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 */

/**
 * @openapi
 * /events/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết một event theo ID
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
 *         description: Thông tin event
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Không tìm thấy event
 *   put:
 *     summary: Cập nhật một event theo ID
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
 *         description: Event đã được cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Không tìm thấy event
 *   delete:
 *     summary: Xóa một event theo ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Event đã được xóa thành công
 *       404:
 *         description: Không tìm thấy event
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

export default router;
