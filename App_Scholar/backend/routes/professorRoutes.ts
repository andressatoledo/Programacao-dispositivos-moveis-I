import { Router } from 'express';
import { ProfessorController } from '../controllers/ProfessorController';

const router = Router();

router.get('/', ProfessorController.listar);
router.get('/combo', ProfessorController.combo);
router.get('/:id', ProfessorController.buscarPorId);
router.post('/', ProfessorController.criar);
router.put('/:id', ProfessorController.atualizar);
router.delete('/:id', ProfessorController.deletar);

export default router;