import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/login', AuthController.login);
router.post('/registrar', AuthController.registrar);
router.put(  "/mudar-senha",    authMiddleware,
  (req, res) =>
    AuthController.mudarSenha(req, res)
);
export default router;