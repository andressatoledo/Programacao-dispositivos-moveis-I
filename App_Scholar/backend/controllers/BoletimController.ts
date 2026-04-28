import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class BoletimController {

  static async listar(req: Request, res: Response) {
    try {
      const boletins = await prisma.boletim.findMany({
        include: {
          aluno: true,
          disciplina: true,
        },
      });

      return res.json(boletins);
    } catch (error) {
      console.error("❌ Erro ao listar boletins:", error);
      return res.status(500).json({ error: "Erro ao listar boletins" });
    }
  }

  static async buscarPorId(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const boletim = await prisma.boletim.findUnique({
        where: { boletimId: id }, 
        include: {
          aluno: true,
          disciplina: true,
        },
      });

      if (!boletim) {
        return res.status(404).json({ error: "Boletim não encontrado" });
      }

      return res.json(boletim);
    } catch (error) {
      console.error("❌ Erro ao buscar boletim:", error);
      return res.status(500).json({ error: "Erro ao buscar boletim" });
    }
  }

  static async buscarPorMatricula(req: Request, res: Response) {
    try {
      const matricula = String(req.params.matricula);

      const aluno = await prisma.aluno.findUnique({
        where: { alunoMatricula: matricula },
        include: {
          boletins: {
            include: {
              disciplina: true,
            },
          },
        },
      });

      if (!aluno) {
        return res.status(404).json({ error: "Aluno não encontrado" });
      }

      const disciplinas = aluno.boletins.map((b) => ({
        disciplina: b.disciplina.disciplinaNome, 
        nota1: b.boletimNota1,                  
        nota2: b.boletimNota2,                  
        media: b.boletimMedia,                  
        situacao: b.boletimSituacao,            
      }));

      return res.json({
        aluno: aluno.alunoNome,
        disciplinas,
      });

    } catch (error) {
      console.error("❌ Erro ao buscar por matrícula:", error);
      return res.status(500).json({ error: "Erro ao buscar boletim" });
    }
  }

  static async criar(req: Request, res: Response) {
    try {
      const { boletimNota1, boletimNota2 } = req.body;

      const media = (boletimNota1 + boletimNota2) / 2;

      let situacao: "Aprovado" | "Reprovado" | "EmRecuperacao";

      if (media >= 7) situacao = "Aprovado";
      else if (media >= 5) situacao = "EmRecuperacao";
      else situacao = "Reprovado";

      const boletim = await prisma.boletim.create({
        data: {
          ...req.body,
          boletimMedia: media,          
          boletimSituacao: situacao,     
        },
      });

      return res.status(201).json(boletim);
    } catch (error) {
      console.error("❌ Erro ao criar boletim:", error);
      return res.status(500).json({ error: "Erro ao criar boletim" });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const { boletimNota1, boletimNota2 } = req.body;

      const media = (boletimNota1 + boletimNota2) / 2;

      let situacao: "Aprovado" | "Reprovado" | "EmRecuperacao";

      if (media >= 7) situacao = "Aprovado";
      else if (media >= 5) situacao = "EmRecuperacao";
      else situacao = "Reprovado";

      const boletim = await prisma.boletim.update({
        where: { boletimId: id }, // ✅ CORRETO
        data: {
          ...req.body,
          boletimMedia: media,       // ✅ CORRETO
          boletimSituacao: situacao, // ✅ CORRETO
        },
      });

      return res.json(boletim);
    } catch (error) {
      console.error("❌ Erro ao atualizar boletim:", error);
      return res.status(500).json({ error: "Erro ao atualizar boletim" });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      await prisma.boletim.delete({
        where: { boletimId: id }, // ✅ CORRETO
      });

      return res.status(204).send();
    } catch (error) {
      console.error("❌ Erro ao deletar boletim:", error);
      return res.status(500).json({ error: "Erro ao deletar boletim" });
    }
  }
}