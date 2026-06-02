import { Router } from "express";
import { LocalidadeController } from "../controllers/localidadeController";

const router = Router();

router.get("/cep/:cep", LocalidadeController.buscarCep);
router.get("/estados", LocalidadeController.estados);
router.get("/estados/:uf/cidades", LocalidadeController.cidades);

export default router;