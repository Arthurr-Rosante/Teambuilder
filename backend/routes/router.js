import express from "express";
const router = express.Router();

//User Routes ------------------------------------------------------------------
import userRoutes from "./userRoutes.js";
router.use("/", userRoutes);
//------------------------------------------------------------------------------

//Team Routes ------------------------------------------------------------------
import teamRoutes from "./teamRoutes.js";
router.use("/", teamRoutes);
//------------------------------------------------------------------------------

export default router;
