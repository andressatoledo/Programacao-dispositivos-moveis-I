import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { BoletimService } from "../services/boletimService";

export class AlunoController {
  private static async validarDuplicidades(
    alunoEmail: string,
    alunoMatricula: string,
    alunoId?: string,
  ) {
    const alunoExistente = await prisma.aluno.findFirst({
      where: {
        OR: [{ alunoEmail }, { alunoMatricula }],
        ...(alunoId && {
          alunoId: {
            not: alunoId,
          },
        }),
      },
    });

    if (!alunoExistente) return null;

    if (alunoExistente.alunoEmail === alunoEmail) {
      return "Já existe um aluno cadastrado com este e-mail.";
    }

    if (alunoExistente.alunoMatricula === alunoMatricula) {
      return "Esta matrícula já está cadastrada.";
    }

    return null;
  }

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
    } catch {
      return res.status(500).json({ message: "Erro ao buscar aluno" });
    }
  }

  /**
   * CRIAR ALUNO + USUÁRIO
   */
  static async criar(req: Request, res: Response) {
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

    const senhaHash = await bcrypt.hash(
      alunoMatricula,
      10,
    );

    const aluno = await prisma.$transaction(
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
                  usuarioNome: alunoNome,
                  usuarioEmail: alunoEmail,
                  usuarioSenha: senhaHash,
                  usuarioRole: "aluno",
                  usuarioAtivo: true,
                },
              },
            },
          });

         await BoletimService.sincronizarAluno(
            aluno.alunoId,
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
      message: "Erro ao criar aluno",
    });
  }
}
  

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
      });

    if (!alunoAtual) {
      return res.status(404).json({
        message:
          "Aluno não encontrado",
      });
    }

    const erroDuplicidade =
      await AlunoController.validarDuplicidades(
        alunoAtual.alunoEmail,
        alunoAtual.alunoMatricula,
        id,
      );

    if (erroDuplicidade) {
      return res.status(409).json({
        message: erroDuplicidade,
      });
    }

    const {
      alunoEmail,
      alunoMatricula,
      cursoId,
      ...dadosAtualizacao
    } = req.body;

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
                cursoId,
              },
            });

          const cursoMudou =
            cursoId &&
            cursoId !==
              alunoAtual.cursoId;

          if (cursoMudou) {
  await BoletimService.sincronizarAluno(
    id,
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
  static async deletar(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const aluno = await prisma.aluno.findUnique({
        where: { alunoId: id },
        include: { usuario: true },
      });

      if (!aluno) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }

      

      await prisma.usuario.update({
        where: { usuarioEmail: aluno.alunoEmail },
        data: {
          usuarioAtivo: false,
        },
      });

      return res.status(204).send();
    } catch {
      return res.status(500).json({ message: "Erro ao desativar aluno" });
    }
  }
}
