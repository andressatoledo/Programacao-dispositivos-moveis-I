import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class ProfessorController {

  static async listar(req: Request, res: Response) {
    try {
      const professores = await prisma.professor.findMany();
      return res.json(professores);
    } catch (error) {
      console.error("❌ Erro ao listar professores:", error);
      return res.status(500).json({ error: "Erro ao listar professores" });
    }
  }

  static async buscarPorId(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const professor = await prisma.professor.findUnique({
        where: { professorId: id }, // ✅ CORRIGIDO
      });

      if (!professor) {
        return res.status(404).json({ error: "Professor não encontrado" });
      }

      return res.json(professor);
    } catch (error) {
      console.error("❌ Erro ao buscar professor:", error);
      return res.status(500).json({ error: "Erro ao buscar professor" });
    }
  }

  static async combo(req: Request, res: Response) {
    try {
      const cursos = await prisma.curso.findMany({
        select: {
          cursoId: true,     // ✅ CORRIGIDO
          cursoNome: true,   // ✅ CORRIGIDO
        },
      });

      const combo = cursos.map((c) => ({
        value: c.cursoId,
        label: c.cursoNome,
      }));

      return res.json(combo);
    } catch (error) {
      console.error("❌ Erro ao gerar combo:", error);
      return res.status(500).json({ error: "Erro ao gerar combo" });
    }
  }

  static async criar(req: Request, res: Response) {
    try {
      const professor = await prisma.professor.create({
        data: req.body,
      });

      return res.status(201).json(professor);
    } catch (error) {
      console.error("❌ Erro ao criar professor:", error);
      return res.status(500).json({ error: "Erro ao criar professor" });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const professor = await prisma.professor.update({
        where: { professorId: id }, // ✅ CORRIGIDO
        data: req.body,
      });

      return res.json(professor);
    } catch (error) {
      console.error("❌ Erro ao atualizar professor:", error);
      return res.status(500).json({ error: "Erro ao atualizar professor" });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      await prisma.professor.delete({
        where: { professorId: id }, // ✅ CORRIGIDO
      });

      return res.status(204).send();
    } catch (error) {
      console.error("❌ Erro ao deletar professor:", error);
      return res.status(500).json({ error: "Erro ao deletar professor" });
    }
  }
}