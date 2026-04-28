import { Router } from 'express';
import { BoletimController } from '../controllers/BoletimController';

const router = Router();

router.get('/', BoletimController.listar);
router.get('/matricula/:matricula', BoletimController.buscarPorMatricula);
router.get('/:id', BoletimController.buscarPorId);
router.post('/', BoletimController.criar);
router.put('/:id', BoletimController.atualizar);
router.delete('/:id', BoletimController.deletar);

export default router;