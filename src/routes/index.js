import express from "express";
import authRoutes from "./auth.route.js";
import todoRoutes from "./todo.route.js";
import transactionRoutes from "./transaction.route.js";
import groupRoutes from "./group.route.js";
import userRoutes from "./user.route.js"

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/todos", todoRoutes);
router.use("/transactions", transactionRoutes);
router.use("/groups", groupRoutes);
router.use("/users", userRoutes);

export default router;
