import { Router } from 'express';
import { DisciplinaController } from '../controllers/disciplinaController';

const router = Router();

router.get('/', DisciplinaController.listar);
router.get('/combo', DisciplinaController.combo); 
router.get('/:id', DisciplinaController.buscarPorId);
router.post('/', DisciplinaController.criar);
router.put('/:id', DisciplinaController.atualizar);
router.delete('/:id', DisciplinaController.deletar);

export default router;