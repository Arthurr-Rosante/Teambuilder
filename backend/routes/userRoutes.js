import express from "express";
import UserController from "../controllers/UserController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Register User ---------------------------------------------------------------
router.post("/auth/register", (req, res) => UserController.register(req, res));

// Log User --------------------------------------------------------------------
router.post("/auth/login", (req, res) => UserController.login(req, res));

// GET User --------------------------------------------------------------------
router.get("/auth/user", authMiddleware, (req, res) =>
  UserController.getUser(req, res)
);

export default router;
