import express from "express";
import { all as trimAll } from "trim-request";
import {
  createTodoHandler,
  deleteTodoHandler,
  getTodoHandler,
  getTodosHandler,
  updateTodoHandler,
} from "../controllers/todo.controller.js";
import { authMiddleware, asyncHandler } from "../middlewares/index.js";
const router = express.Router();

router.route("/").get(authMiddleware, asyncHandler(getTodosHandler));
router
  .route("/")
  .post(trimAll, authMiddleware, asyncHandler(createTodoHandler));
router
  .route("/:id")
  .put(trimAll, authMiddleware, asyncHandler(updateTodoHandler));
router.route("/:id").delete(authMiddleware, asyncHandler(deleteTodoHandler));
router.route("/:id").get(authMiddleware, asyncHandler(getTodoHandler));

export default router;
