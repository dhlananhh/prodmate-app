import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  getProfile
} from "../controllers/user.controller";
import * as authMiddleware from "../middlewares/auth.middleware";


const router = Router();


/**
 * @openapi
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: secret123
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Registration failed
 * 
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful, returns access and refresh tokens
 *       400:
 *         description: Invalid credentials
 * 
 * /users/profile:
 *   get:
 *     summary: Get profile of logged-in user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned successfully
 *       401:
 *         description: Unauthorized (no or invalid token)
 */


/**
 * USERS CRUD
 */

// get all users (without relations)
// GET /api/users
router.get("/", getAllUsers);

// get a specific user by id
// GET /api/users/:id
router.get("/:id", getUserById);

// register a new user
// POST /api/users/register
router.post("/register", registerUser);

// login user
// POST /api/users/login
router.post("/login", loginUser);

// get profile of logged-in user
// GET /api/users/profile
router.get("/profile", authMiddleware.authenticate, getProfile);

export default router;
