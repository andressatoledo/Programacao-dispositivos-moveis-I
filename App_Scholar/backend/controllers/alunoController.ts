import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { ComboOption } from "../type/comboOption";

export class AlunoController {

  static async listar(req: Request, res: Response) {
    const alunos = await prisma.aluno.findMany({
      include: { curso: true },
    });

    return res.json(alunos);
  }

  static async buscarPorId(req: Request, res: Response) {
  try {
    const id = String(req.params.id);

    const aluno = await prisma.aluno.findUnique({
      where: { alunoId: id },
      include: { curso: true },
    });

    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }

    return res.json(aluno);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar aluno" });
  }
}

  static async criar(req: Request, res: Response) {
    const aluno = await prisma.aluno.create({
      data: req.body,
    });

    return res.status(201).json(aluno);
  }

  static async atualizar(req: Request, res: Response) {
    const id = String(req.params.id);

    const aluno = await prisma.aluno.update({
      where: { alunoId: id },
      data: req.body,
    });

    return res.json(aluno);
  }

  static async deletar(req: Request, res: Response) {
    const id = String(req.params.id);

    await prisma.aluno.delete({
      where: { alunoId: id },
    });

    return res.status(204).send();
  }

  static async combo(req: Request, res: Response) {
    const alunos = await prisma.aluno.findMany({
      select: {
        alunoId: true,
        alunoNome: true,
      },
    });

    const combo: ComboOption[] = alunos.map((a) => ({
      value: a.alunoId,
      label: a.alunoNome,
    }));

    return res.json(combo);
  }
}