import { Router } from "express";

import { AvisoController } from "../controllers/avisoController";

import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  AvisoController.listar,
);

router.get(
  "/nao-lidos",
  authMiddleware,
  AvisoController.naoLidos,
);

router.get(
  "/contador",
  authMiddleware,
  AvisoController.quantidadeNaoLidos,
);

// router.get(
//   "/combo/cursos",
//   authMiddleware,
//   AvisoController.comboCursos,
// );

router.get(
  "/:id",
  authMiddleware,
  AvisoController.buscarPorId,
);

router.post(
  "/",
  authMiddleware,
  AvisoController.criar,
);

router.put(
  "/:id",
  authMiddleware,
  AvisoController.atualizar,
);

router.delete(
  "/:id",
  authMiddleware,
  AvisoController.deletar,
);

router.post(
  "/:id/lido",
  authMiddleware,
  AvisoController.marcarComoLido,
);

export default router;