import { Router } from "express";


import todoRoutes from "./todo.routes";
import habitRoutes from "./habit.routes";
import eventRoutes from "./event.routes";
import authRoutes from "./auth.routes";
import jwksRoutes from "./jwks.routes";
import userRoutes from "./user.routes";


const router = Router();

// Mount each route under its base path
router.use("/", jwksRoutes);
router.use("/todos", todoRoutes);
router.use("/habits", habitRoutes);
router.use("/events", eventRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);


export default router;
