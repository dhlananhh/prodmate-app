import { Router } from "express";
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} from "../controllers/todo.controller";

const router = Router();


/**
 * @openapi
 * /todos:
 *   get:
 *     summary: Lấy danh sách tất cả todos
 *     tags:
 *       - Todos
 *     responses:
 *       200:
 *         description: Danh sách todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *   post:
 *     summary: Tạo mới một todo
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
 *         description: Todo được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */

/**
 * @openapi
 * /todos/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết một todo theo ID
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
 *         description: Thông tin todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Không tìm thấy todo
 *   put:
 *     summary: Cập nhật một todo theo ID
 *     tags:
 *       - Todos
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
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       200:
 *         description: Todo đã được cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Không tìm thấy todo
 *   delete:
 *     summary: Xóa một todo theo ID
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Todo đã được xóa thành công
 *       404:
 *         description: Không tìm thấy todo
 */


// get all todos
// GET /api/todos
router.get("/", getAllTodos);

// get a single todo by id
// GET /api/todos/:id
router.get("/:id", getTodoById);

// create a new todo
// POST /api/todos
router.post("/:id", createTodo);

// update an existing todo by id
// PUT /api/todos/:id
router.put("/:id", updateTodo);

// delete a todo by id
// DELETE /api/todos/:id
router.delete("/:id", deleteTodo);

export default router;
