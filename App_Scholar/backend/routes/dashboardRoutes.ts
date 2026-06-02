// routes/dashboard.routes.ts

import { Router } from "express";
import { DashboardController } from "../controllers/dashboardController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();


router.get(
  "/resumo",
  authMiddleware,
  DashboardController.resumo
);

export default router;