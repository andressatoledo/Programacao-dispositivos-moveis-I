import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { ProcessarSemestreController } from '../controllers/processarSemestre';

const router = Router();

router.post(
  "/processar-semestres",
  authMiddleware,
  ProcessarSemestreController.processarSemestres,
);

export default router;