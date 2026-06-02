import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController';

const router = Router();

router.get('/', UsuarioController.listar);
router.get('/combo', UsuarioController.combo);
router.get('/:id', UsuarioController.buscarPorId);
router.post('/', UsuarioController.criar);
router.put('/:id', UsuarioController.atualizar);
router.delete('/:id', UsuarioController.deletar);

export default router;