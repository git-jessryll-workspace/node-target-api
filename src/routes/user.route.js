import express from "express";
import { all as trimAll } from "trim-request";
import { asyncHandler, authMiddleware } from "../middlewares/index.js";
import { searchUsersHandler } from "../controllers/user.controller.js";

const router = express.Router();

router
  .route("/search")
  .post(trimAll, authMiddleware, asyncHandler(searchUsersHandler));

export default router;
