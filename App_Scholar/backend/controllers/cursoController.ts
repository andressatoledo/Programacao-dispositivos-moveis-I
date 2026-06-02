import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { ComboOption } from "../type/comboOption";

export class CursoController {

  static async listar(req: Request, res: Response) {
    try {
      const cursos = await prisma.curso.findMany();
      return res.json(cursos);
    } catch (error) {
      console.error("Erro ao listar cursos:", error);
      return res.status(500).json({ error: "Erro ao listar cursos" });
    }
  }

  static async buscarPorId(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const curso = await prisma.curso.findUnique({
        where: { cursoId: id }, 
      });

      if (!curso) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

      return res.json(curso);
    } catch (error) {
      console.error("Erro ao buscar curso:", error);
      return res.status(500).json({ error: "Erro ao buscar curso" });
    }
  }

  static async combo(req: Request, res: Response) {
    try {
      const cursos = await prisma.curso.findMany({
        select: {
          cursoId: true,      
          cursoNome: true,    
        },
      });

      const combo: ComboOption[] = cursos.map((c) => ({
        value: c.cursoId,
        label: c.cursoNome,
      }));

      return res.json(combo);
    } catch (error) {
      console.error("Erro ao gerar combo:", error);
      return res.status(500).json({ error: "Erro ao gerar combo" });
    }
  }

  static async criar(req: Request, res: Response) {
    try {
      const curso = await prisma.curso.create({
        data: req.body,
      });

      return res.status(201).json(curso);
    } catch (error) {
      console.error("Erro ao criar curso:", error);
      return res.status(500).json({ error: "Erro ao criar curso" });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const curso = await prisma.curso.update({
        where: { cursoId: id }, 
        data: req.body,
      });

      return res.json(curso);
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      return res.status(500).json({ error: "Erro ao atualizar curso" });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      await prisma.curso.delete({
        where: { cursoId: id }, // ✅ CORRIGIDO
      });

      return res.status(204).send();
    } catch (error) {
      console.error("❌ Erro ao deletar curso:", error);
      return res.status(500).json({ error: "Erro ao deletar curso" });
    }
  }
}