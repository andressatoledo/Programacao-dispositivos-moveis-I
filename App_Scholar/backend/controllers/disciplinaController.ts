import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { ComboOption } from "../type/comboOption";
import { BoletimSituacao } from "@prisma/client";
import { BoletimService } from "../services/boletimService";

export class DisciplinaController {

  static async listar(req: Request, res: Response) {
    try {
      const disciplinas = await prisma.disciplina.findMany({
        include: {
          professor: true,
          curso: true,
        },
      });

      return res.json(disciplinas);
    } catch (error) {
      console.error("Erro ao listar disciplinas:", error);
      return res.status(500).json({ error: "Erro ao listar disciplinas" });
    }
  }

  static async buscarPorId(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const disciplina = await prisma.disciplina.findUnique({
        where: { disciplinaId: id }, 
        include: {
          professor: true,
          curso: true,
        },
      });

      if (!disciplina) {
        return res.status(404).json({ error: "Disciplina não encontrada" });
      }

      return res.json(disciplina);
    } catch (error) {
      console.error("Erro ao buscar disciplina:", error);
      return res.status(500).json({ error: "Erro ao buscar disciplina" });
    }
  }

  static async criar(req: Request, res: Response) {
    try {
      const disciplina = await prisma.disciplina.create({
        data: req.body,
      });

      await BoletimService.sincronizarCurso(
        disciplina.cursoId,
      );

      return res.status(201).json(disciplina);
    } catch (error) {
      console.error("Erro ao criar disciplina:", error);
      return res.status(500).json({ error: "Erro ao criar disciplina" });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const disciplina = await prisma.disciplina.update({
        where: { disciplinaId: id }, 
        data: req.body,
      });

      await BoletimService.sincronizarCurso(
        disciplina.cursoId,
      );

      return res.json(disciplina);
    } catch (error) {
      console.error(" Erro ao atualizar disciplina:", error);
      return res.status(500).json({ error: "Erro ao atualizar disciplina" });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      await prisma.disciplina.update({
        where: { disciplinaId: id },
        data: {
          disciplinaAtiva: false,
        },
      });

      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar disciplina:", error);
      return res.status(500).json({ error: "Erro ao deletar disciplina" });
    }
  }

  static async combo(req: Request, res: Response) {
    try {
      const { cursoId } = req.query;

      const disciplinas = await prisma.disciplina.findMany({
        where: {
          ...(cursoId && { cursoId: String(cursoId) }),
        },
        include: {
          curso: true,
        },
      });

      const combo: ComboOption[] = disciplinas.map((d) => ({
        value: d.disciplinaId, 
        label: `${d.disciplinaNome} - ${d.curso?.cursoNome ?? ""}`, 
      }));

      return res.json(combo);
    } catch (error) {
      console.error("Erro ao gerar combo de disciplinas:", error);
      return res.status(500).json({ error: "Erro ao gerar combo" });
    }
  }


  
  
}