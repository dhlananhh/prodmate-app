import { Router } from "express";
import {
  createHabit,
  deleteHabit,
  getAllHabits,
  getHabitById,
  updateHabit
} from "../controllers/habit.controller";

const router = Router();


/**
 * @openapi
 * /habits:
 *   get:
 *     summary: Lấy danh sách tất cả habits
 *     tags:
 *       - Habits
 *     responses:
 *       200:
 *         description: Danh sách habits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Habit'
 *   post:
 *     summary: Tạo mới một habit
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
 *         description: Habit được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Habit'
 */

/**
 * @openapi
 * /habits/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết một habit theo ID
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
 *         description: Thông tin habit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Habit'
 *       404:
 *         description: Không tìm thấy habit
 *   put:
 *     summary: Cập nhật một habit theo ID
 *     tags:
 *       - Habits
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
 *             $ref: '#/components/schemas/HabitInput'
 *     responses:
 *       200:
 *         description: Habit đã được cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Habit'
 *       404:
 *         description: Không tìm thấy habit
 *   delete:
 *     summary: Xóa một habit theo ID
 *     tags:
 *       - Habits
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Habit đã được xóa thành công
 *       404:
 *         description: Không tìm thấy habit
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

export default router;
