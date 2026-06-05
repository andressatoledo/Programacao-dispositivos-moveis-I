import { Router } from 'express';
import { BoletimController } from '../controllers/BoletimController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/',authMiddleware, BoletimController.listar);
router.get('/matricula/:matricula', BoletimController.buscarPorMatricula);
router.get('/:id', BoletimController.buscarPorId);
router.post('/', BoletimController.criar);
router.put('/:id', BoletimController.atualizar);
router.delete('/:id', BoletimController.deletar);

export default router;