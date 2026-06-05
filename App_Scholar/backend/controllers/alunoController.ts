import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { AuthRequest } from "../middlewares/authMiddleware";
import { BoletimService } from "../services/boletimService";

export class AlunoController {
  /**
   * VALIDAR DUPLICIDADES
   */
  private static async validarDuplicidades(
    alunoEmail: string,
    alunoMatricula: string,
    alunoId?: string,
  ) {
    const alunoExistente =
      await prisma.aluno.findFirst({
        where: {
          OR: [
            { alunoEmail },
            { alunoMatricula },
          ],

          ...(alunoId && {
            alunoId: {
              not: alunoId,
            },
          }),
        },
      });

    if (!alunoExistente) {
      return null;
    }

    if (
      alunoExistente.alunoEmail ===
      alunoEmail
    ) {
      return "Já existe um aluno cadastrado com este e-mail.";
    }

    if (
      alunoExistente.alunoMatricula ===
      alunoMatricula
    ) {
      return "Esta matrícula já está cadastrada.";
    }

    return null;
  }

  /**
   * LISTAR
   */
  static async listar(
  req: AuthRequest,
  res: Response,
) {
  try {
    const user = req.user;

    let where: any = {};

    console.log('professor?',user?.role)
    // PROFESSOR
    if (user?.role === "professor") {
      where = {
        boletins: {
          some: {
            disciplina: {
              professorId:
                user.professorId,
            },
          },
        },
      };
    }

    // ALUNO
    if (user?.role === "aluno") {
      where = {
        alunoId: user.alunoId,
      };
    }

    const alunos =
      await prisma.aluno.findMany({
        where,

        include: {
          curso: true,
        },
      });

    return res.json(alunos);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message:
        "Erro ao listar alunos",
    });
  }
  }

  /**
   * BUSCAR POR ID
   */
  static async buscarPorId(
    req: Request,
    res: Response,
  ) {
    try {
      const id = String(req.params.id);

      const aluno =
        await prisma.aluno.findUnique({
          where: {
            alunoId: id,
          },

          include: {
            curso: true,
          },
        });

      if (!aluno) {
        return res.status(404).json({
          message:
            "Aluno não encontrado",
        });
      }

      return res.json(aluno);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message:
          "Erro ao buscar aluno",
      });
    }
  }

  /**
   * CRIAR
   */
  static async criar(
    req: Request,
    res: Response,
  ) {
    try {
      const {
        alunoNome,
        alunoEmail,
        alunoMatricula,
        alunoTelefone,
        alunoCep,
        alunoEndereco,
        alunoCidade,
        alunoEstado,
        cursoId,
      } = req.body;

      const erroDuplicidade =
        await AlunoController.validarDuplicidades(
          alunoEmail,
          alunoMatricula,
        );

      if (erroDuplicidade) {
        return res.status(409).json({
          message: erroDuplicidade,
        });
      }

      const senhaHash =
        await bcrypt.hash(
          alunoMatricula,
          10,
        );

      const aluno =
        await prisma.$transaction(
          async (tx) => {
            const novoAluno =
              await tx.aluno.create({
                data: {
                  alunoNome,
                  alunoEmail,
                  alunoMatricula,
                  alunoTelefone,
                  alunoCep,
                  alunoEndereco,
                  alunoCidade,
                  alunoEstado,
                  cursoId,

                  usuario: {
                    create: {
                      usuarioNome:
                        alunoNome,

                      usuarioEmail:
                        alunoEmail,

                      usuarioSenha:
                        senhaHash,

                      usuarioRole:
                        "aluno",

                      usuarioAtivo:
                        true,
                    },
                  },
                },
              });

            await BoletimService.sincronizarAluno(
              novoAluno.alunoId,
              tx,
            );

            return novoAluno;
          },
        );

      return res.status(201).json(aluno);
    } catch (error) {
      console.error(error);

      if (
        error instanceof
          Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return res.status(409).json({
          message:
            "Já existe um aluno com os dados informados.",
        });
      }

      return res.status(500).json({
        message:
          "Erro ao criar aluno",
      });
    }
  }

  /**
   * ATUALIZAR
   */
  static async atualizar(
    req: Request,
    res: Response,
  ) {
    try {
      const id = String(req.params.id);

      const alunoAtual =
        await prisma.aluno.findUnique({
          where: {
            alunoId: id,
          },

          include: {
            usuario: true,
          },
        });

      if (!alunoAtual) {
        return res.status(404).json({
          message:
            "Aluno não encontrado",
        });
      }

      const {
        alunoEmail,
        alunoMatricula,
        cursoId,
        ...dadosAtualizacao
      } = req.body;

      const erroDuplicidade =
        await AlunoController.validarDuplicidades(
          alunoEmail,
          alunoMatricula,
          id,
        );

      if (erroDuplicidade) {
        return res.status(409).json({
          message: erroDuplicidade,
        });
      }

      const aluno =
        await prisma.$transaction(
          async (tx) => {
            const alunoAtualizado =
              await tx.aluno.update({
                where: {
                  alunoId: id,
                },

                data: {
                  ...dadosAtualizacao,

                  alunoEmail,
                  alunoMatricula,

                  cursoId,

                  usuario: {
                    update: {
                      usuarioNome:
                        dadosAtualizacao.alunoNome,

                      usuarioEmail:
                        alunoEmail,
                    },
                  },
                },

                include: {
                  curso: true,
                  usuario: true,
                },
              });

            const cursoMudou =
              cursoId &&
              cursoId !==
                alunoAtual.cursoId;

            console.log(
              "cursoMudou",
              cursoMudou,
            );

            if (cursoMudou) {
              await BoletimService.sincronizarAluno(
                id,
                tx,
              );
            }

            return alunoAtualizado;
          },
        );

      return res.json(aluno);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message:
          "Erro ao atualizar aluno",
      });
    }
  }

  /**
   * SOFT DELETE
   */
  static async deletar(
    req: Request,
    res: Response,
  ) {
    try {
      const id = String(req.params.id);

      const aluno =
        await prisma.aluno.findUnique({
          where: {
            alunoId: id,
          },

          include: {
            usuario: true,
          },
        });

      if (!aluno) {
        return res.status(404).json({
          message:
            "Aluno não encontrado",
        });
      }

      if (aluno.usuario) {
        await prisma.usuario.update({
          where: {
            usuarioId:
              aluno.usuario.usuarioId,
          },

          data: {
            usuarioAtivo: false,
          },
        });
      }

      return res.status(204).send();
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message:
          "Erro ao desativar aluno",
      });
    }
  }
}