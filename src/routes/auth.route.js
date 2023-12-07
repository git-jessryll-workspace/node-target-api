import express from "express";
import { all as trimAll } from "trim-request";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/index.js";
const router = express.Router();

router.route("/register").post(trimAll, register);
router.route("/login").post(trimAll, login);
router.route("/logout").post(trimAll, logout);
router.route("/refreshtoken").post(trimAll, refreshToken);
router.route("/test-middleware").get(trimAll, authMiddleware, (req, res) => {
  res.send(req.user);
});
export default router;
