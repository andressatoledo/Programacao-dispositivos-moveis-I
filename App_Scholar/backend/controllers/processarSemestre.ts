import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { ProcessarSemestresService } from "../services/processarSemestres";
export class ProcessarSemestreController {
  static async processarSemestres(req: AuthRequest, res: Response) {
    try {
      if (req.user?.role !== "admin") {
        return res.status(403).json({
          error: "Acesso negado",
        });
      }

      const resultado = await ProcessarSemestresService.processarSemestres();

      return res.json(resultado);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Erro ao processar semestres",
      });
    }
  }
}
