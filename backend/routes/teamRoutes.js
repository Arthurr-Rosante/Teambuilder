import express from "express";
import TeamController from "../controllers/TeamController.js";

const router = express.Router();

// GET all Teams ---------------------------------------------------------------
router.get("/users/:id/teams", (req, res) => TeamController.getAll(req, res));
// GET a Specific Team ---------------------------------------------------------
router.get("/users/:id/teams/:teamId", (req, res) => {
  TeamController.getOne(req, res);
});
// POST create new Team --------------------------------------------------------
router.post("/users/:id/teams", (req, res) => {
  TeamController.create(req, res);
});
// DELETE specific Team --------------------------------------------------------
router.delete("/users/:id/teams/:teamId", (req, res) => {
  TeamController.delete(req, res);
});
// PUT specific Team -----------------------------------------------------------
router.put("/users/:id/teams/:teamId", (req, res) => {
  TeamController.update(req, res);
});

export default router;
