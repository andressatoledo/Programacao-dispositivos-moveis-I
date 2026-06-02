import { Request, Response } from "express";
import { ViaCepService } from "../services/viaCep";
import { IbgeService } from "../services/ibge";

export class LocalidadeController {

  /**
   * Buscar endereço por CEP (ViaCEP)
   */
  static async buscarCep(req: Request, res: Response) {
    try {
      const { cep } = req.params as { cep: string };

      const data = await ViaCepService.buscarCep(cep);

      if (!data) {
        return res.status(404).json({
          message: "CEP não encontrado",
        });
      }

      return res.json(data);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao consultar CEP",
        error: error
      });
    }
  }

  /**
   * Listar estados (IBGE)
   */
  static async estados(req: Request, res: Response) {
    try {
      const estados = await IbgeService.listarEstados();
      return res.json(estados);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar estados",
        error: error
      });
    }
  }

  /**
   * Listar cidades por estado
   */
  static async cidades(req: Request, res: Response) {
    try {
      const { uf } = req.params as { uf: string };

      const cidades = await IbgeService.listarCidades(uf);
      return res.json(cidades);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar cidades",
        error: error
      });
    }
  }
}