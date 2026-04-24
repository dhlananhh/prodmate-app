import { Router } from "express";

import todoRoutes from "./todo.routes";
import habitRoutes from "./habit.routes";
import eventRoutes from "./event.routes";

const router = Router();

// Mount each route under its base path
router.use("/todos", todoRoutes);
router.use("/habits", habitRoutes);
router.use("/events", eventRoutes);

export default router;
