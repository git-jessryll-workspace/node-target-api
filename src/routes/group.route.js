import express from "express";
import { all as trimAll } from "trim-request";
import { asyncHandler, authMiddleware } from "../middlewares/index.js";
import {
  createGroupHandler,
  getGroupHandler,
  getGroupsHandler,
  updateGroupHandler,
} from "../controllers/group.controller.js";
import { deleteGroup } from "../services/group.service.js";

const router = express.Router();

router.route("/").get(authMiddleware, asyncHandler(getGroupsHandler));
router
  .route("/")
  .post(trimAll, authMiddleware, asyncHandler(createGroupHandler));
router
  .route("/:id")
  .put(trimAll, authMiddleware, asyncHandler(updateGroupHandler));
router.route("/:id").delete(authMiddleware, asyncHandler(deleteGroup));
router.route("/:id").get(authMiddleware, asyncHandler(getGroupHandler));
export default router;
