import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { ComboOption } from "../type/comboOption";

export class ProfessorController {
  private static async validarDuplicidades(
    professorEmail: string,
    professorId?: string,
  ) {
    const professorExistente = await prisma.professor.findFirst({
      where: {
        professorEmail,
        ...(professorId && {
          professorId: {
            not: professorId,
          },
        }),
      },
    });

    if (!professorExistente) return null;

    return "Já existe um professor cadastrado com este e-mail.";
  }

  static async listar(req: Request, res: Response) {
    try {
      const professores = await prisma.professor.findMany();

      return res.json(professores);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao listar professores",
      });
    }
  }

  static async combo(req: Request, res: Response) {
    try {
      const professores = await prisma.professor.findMany({
        select: {
          professorId: true,
          professorNome: true,
        },
      });

      const combo: ComboOption[] = professores.map((p) => ({
        value: p.professorId,
        label: p.professorNome,
      }));

      return res.json(combo);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao gerar combo",
      });
    }
  }

  static async buscarPorId(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const professor = await prisma.professor.findUnique({
        where: { professorId: id },
      });

      if (!professor) {
        return res.status(404).json({
          message: "Professor não encontrado",
        });
      }

      return res.json(professor);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao buscar professor",
      });
    }
  }

  /**
   * CRIAR PROFESSOR + USUÁRIO
   */
  static async criar(req: Request, res: Response) {
    try {
      const {
        professorNome,
        professorEmail,
        professorTitulacao,
        professorAreaAtuacao,
        professorTempoDocencia,
      } = req.body;

      if (!professorNome || !professorEmail) {
        return res.status(400).json({
          message: "Nome e e-mail são obrigatórios",
        });
      }

      const erroDuplicidade =
        await ProfessorController.validarDuplicidades(
          professorEmail,
        );

      if (erroDuplicidade) {
        return res.status(409).json({
          message: erroDuplicidade,
        });
      }

      const senhaHash = await bcrypt.hash(
        String(professorEmail),
        10,
      );

      const professor = await prisma.professor.create({
        data: {
          professorNome,
          professorTitulacao,
          professorAreaAtuacao,
          professorTempoDocencia,
          professorEmail,

          usuario: {
            create: {
              usuarioNome: professorNome,
              usuarioEmail: professorEmail,
              usuarioSenha: senhaHash,
              usuarioRole: "professor",
              usuarioAtivo: true,
            },
          },
        },
      });

      return res.status(201).json(professor);
    } catch (error) {
      console.error(error);

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return res.status(409).json({
          message: "Já existe um professor cadastrado com este e-mail.",
        });
      }

      return res.status(500).json({
        message: "Erro ao criar professor",
      });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const erroDuplicidade =
        await ProfessorController.validarDuplicidades(
          req.body.professorEmail,
          id,
        );

      if (erroDuplicidade) {
        return res.status(409).json({
          message: erroDuplicidade,
        });
      }

      const professor = await prisma.professor.update({
        where: {
          professorId: id,
        },
        data: req.body,
      });

      return res.json(professor);
    } catch (error) {
      console.error(error);

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return res.status(409).json({
          message: "Já existe um professor cadastrado com este e-mail.",
        });
      }

      return res.status(500).json({
        message: "Erro ao atualizar professor",
      });
    }
  }

  /**
   * SOFT DELETE
   */
  static async deletar(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const professor = await prisma.professor.findUnique({
        where: {
          professorId: id,
        },
      });

      if (!professor) {
        return res.status(404).json({
          message: "Professor não encontrado",
        });
      }

      await prisma.usuario.update({
        where: {
          usuarioEmail: professor.professorEmail,
        },
        data: {
          usuarioAtivo: false,
        },
      });

      return res.status(204).send();
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao desativar professor",
      });
    }
  }
}