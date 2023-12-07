import express from "express";
import { all as trimAll } from "trim-request";
import { authMiddleware, asyncHandler } from "../middlewares/index.js";
import {
  createTransactionHandler,
  deleteTransactionHandler,
  getTransactionHandler,
  getTransactionsHandler,
  updateTransactionHandler,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.route("/").get(authMiddleware, asyncHandler(getTransactionsHandler));
router
  .route("/")
  .post(trimAll, authMiddleware, asyncHandler(createTransactionHandler));
router
  .route("/:id")
  .put(trimAll, authMiddleware, asyncHandler(updateTransactionHandler));

router
  .route("/:id")
  .delete(authMiddleware, asyncHandler(deleteTransactionHandler));

router.route("/:id").get(authMiddleware, asyncHandler(getTransactionHandler));

export default router;
