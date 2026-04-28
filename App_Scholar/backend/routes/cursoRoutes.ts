import { Router } from 'express';
import { CursoController } from '../controllers/cursoController';

const router = Router();

router.get('/', CursoController.listar);
router.get('/combo', CursoController.combo);
router.get('/:id', CursoController.buscarPorId);
router.post('/', CursoController.criar);
router.put('/:id', CursoController.atualizar);
router.delete('/:id', CursoController.deletar);

export default router;