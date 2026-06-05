import { Router } from 'express';
import { AlunoController } from '../controllers/alunoController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, AlunoController.listar);
router.get('/:id', AlunoController.buscarPorId);
router.post('/', AlunoController.criar);
router.put('/:id', AlunoController.atualizar);
router.delete('/:id', AlunoController.deletar);

export default router;