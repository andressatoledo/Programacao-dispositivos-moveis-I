import { Response } from "express";

import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middlewares/authMiddleware";
import { ComboOption } from "../type/comboOption";


export class AvisoController {
private static async gerarFiltroAluno(
  alunoId: string,
) {
  const aluno =
    await prisma.aluno.findUnique({
      where: {
        alunoId,
      },

      select: {
        cursoId: true,
        alunoSemestreAtual: true,
      },
    });

  if (!aluno) {
    throw new Error(
      "Aluno não encontrado",
    );
  }

  const disciplinas =
    await prisma.disciplina.findMany({
      where: {
        cursoId: aluno.cursoId,

        disciplinaSemestre: {
          lte:
            aluno.alunoSemestreAtual,
        },

        disciplinaAtiva: true,
      },

      select: {
        disciplinaId: true,
      },
    });

  return {
    OR: [
      {
        cursoId: null,
        disciplinaId: null,
      },

      {
        cursoId: aluno.cursoId,
        disciplinaId: null,
      },

      {
        disciplinaId: {
          in: disciplinas.map(
            (d) =>
              d.disciplinaId,
          ),
        },
      },
    ],
  };
}
    
  static async listar(
  req: AuthRequest,
  res: Response,
) {
  try {
    const user = req.user;

    let where: any = {
      avisoAtivo: true,
    };

    if (
      user?.role === "aluno" &&
      user.alunoId
    ) {
      const filtroAluno =
        await this.gerarFiltroAluno(
          user.alunoId,
        );

      where = {
        ...where,
        ...filtroAluno,
      };
    }

    const avisos =
      await prisma.aviso.findMany({
        where,

        select: {
          avisoId: true,
          avisoTitulo: true,
          avisoMensagem: true,
          avisoCreatedAt: true,

          criadoPor: {
            select: {
              usuarioNome: true,
            },
          },

          curso: {
            select: {
              cursoId: true,
              cursoNome: true,
            },
          },

          disciplina: {
            select: {
              disciplinaId: true,
              disciplinaNome: true,
            },
          },
        },

        orderBy: {
          avisoCreatedAt: "desc",
        },
      });

    return res.json(avisos);
  } catch (error) {
    console.error(
      "Erro ao listar avisos:",
      error,
    );

    return res.status(500).json({
      error: "Erro ao listar avisos",
    });
  }
}

  static async buscarPorId(
  req: AuthRequest,
  res: Response,
) {
  try {
    const avisoId = String(
      req.params.id,
    );

    const aviso =
      await prisma.aviso.findUnique({
        where: {
          avisoId,
        },

        include: {
          criadoPor: true,
          curso: true,
          disciplina: true,
        },
      });

    if (!aviso) {
      return res.status(404).json({
        error:
          "Aviso não encontrado",
      });
    }

    return res.json(aviso);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error:
        "Erro ao buscar aviso",
    });
  }
}

  static async criar(
  req: AuthRequest,
  res: Response,
) {
  try {
    const user = req.user;

    if (
      user?.role !== "admin" &&
      user?.role !== "professor"
    ) {
      return res.status(403).json({
        error: "Sem permissão",
      });
    }

    const aviso =
      await prisma.aviso.create({
        data: {
          ...req.body,
          criadoPorId: user.sub,
        },
      });

    return res
      .status(201)
      .json(aviso);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error:
        "Erro ao criar aviso",
    });
  }
}

  static async atualizar(
  req: AuthRequest,
  res: Response,
) {
  try {
    const avisoId = String(
      req.params.id,
    );

    const aviso =
      await prisma.aviso.update({
        where: {
          avisoId,
        },

        data: req.body,
      });

    return res.json(aviso);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error:
        "Erro ao atualizar aviso",
    });
  }
}

  static async deletar(
    req: AuthRequest,
    res: Response,
  ) {
    try {
      const avisoId = String(
        req.params.id,
      );

      await prisma.aviso.delete({
        where: {
          avisoId,
        },
      });

      return res.status(204).send();
    } catch (error) {
      console.error(
        "Erro ao excluir aviso:",
        error,
      );

      return res.status(500).json({
        error: "Erro ao excluir aviso",
      });
    }
  }

  static async marcarComoLido(
    req: AuthRequest,
    res: Response,
  ) {
    try {
      const avisoId = String(
        req.params.id,
      );

      const alunoId =
        req.user?.alunoId;

      if (!alunoId) {
        return res.status(403).json({
          error:
            "Apenas alunos podem visualizar avisos",
        });
      }

      await prisma.avisoVisualizacao.upsert(
        {
          where: {
            avisoId_alunoId: {
              avisoId,
              alunoId,
            },
          },

          create: {
            avisoId,
            alunoId,
          },

          update: {},
        },
      );

      return res.json({
        success: true,
      });
    } catch (error) {
      console.error(
        "Erro ao marcar aviso:",
        error,
      );

      return res.status(500).json({
        error:
          "Erro ao marcar aviso",
      });
    }
  }

  static async naoLidos(
    req: AuthRequest,
    res: Response,
  ) {
    try {
      const alunoId =
        req.user?.alunoId;

      if (!alunoId) {
        return res.json([]);
      }

      const avisos =
        await prisma.aviso.findMany({
          where: {
            avisoAtivo: true,

            visualizacoes: {
              none: {
                alunoId,
              },
            },
          },

          include: {
            criadoPor: true,
          },

          orderBy: {
            avisoCreatedAt: "desc",
          },
        });

      return res.json(avisos);
    } catch (error) {
      console.error(
        "Erro ao buscar não lidos:",
        error,
      );

      return res.status(500).json({
        error:
          "Erro ao buscar avisos",
      });
    }
  }

  static async quantidadeNaoLidos(
    req: AuthRequest,
    res: Response,
  ) {
    try {
      const alunoId =
        req.user?.alunoId;

      if (!alunoId) {
        return res.json({
          quantidade: 0,
        });
      }

      const quantidade =
        await prisma.aviso.count({
          where: {
            visualizacoes: {
              none: {
                alunoId,
              },
            },
          },
        });

      return res.json({
        quantidade,
      });
    } catch (error) {
      console.error(
        "Erro ao contar avisos:",
        error,
      );

      return res.status(500).json({
        error:
          "Erro ao contar avisos",
      });
    }
  }

  static async comboCursos(
    req: AuthRequest,
    res: Response,
  ) {
    try {
      const cursos =
        await prisma.curso.findMany();

      const combo: ComboOption[] =
        cursos.map((c) => ({
          value: c.cursoId,
          label: c.cursoNome,
        }));

      return res.json(combo);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao gerar combo",
      });
    }
  }
}