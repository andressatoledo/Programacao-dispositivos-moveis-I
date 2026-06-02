import { prisma } from "../lib/prisma";
import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";

export class DashboardController {
  static async resumo(req: AuthRequest, res: Response) {
    try {
       
      const usuario = req.user;

      // ==========================
      // ADMIN
      // ==========================
      if (!usuario) {
        return res.status(401).json({
          message: "Usuário não autenticado",
        });
      }
      
      if (usuario.role === "admin") {
        const [
          alunos,
          professores,
          disciplinas,
          boletins,
        ] = await Promise.all([
          prisma.aluno.count({
            where: {
              usuario: {
                usuarioAtivo: true,
              },
            },
          }),

          prisma.professor.count({
            where: {
              usuario: {
                usuarioAtivo: true,
              },
            },
          }),

          prisma.disciplina.count(),

          prisma.boletim.count(),
        ]);

        return res.json({
          alunos,
          professores,
          disciplinas,
          boletins,
        });
      }

      // ==========================
      // PROFESSOR
      // ==========================
      if (usuario.role === "professor") {
        const professorId = usuario.professorId;
        if (professorId === null) {
          return res.status(400).json({
            message: "Professor sem ID associado",
          });
        }

        const disciplinas = await prisma.disciplina.count({
          where: {
            professorId,
          },
        });

        const boletins = await prisma.boletim.count({
          where: {
            disciplina: {
              professorId,
            },
          },
        });

        const alunos = await prisma.aluno.count({
          where: {
            usuario: {
              usuarioAtivo: true,
            },

            boletins: {
              some: {
                disciplina: {
                  professorId,
                },
              },
            },
          },
        });

        return res.json({
          alunos,
          disciplinas,
          boletins,
        });
      }

      // ==========================
      // ALUNO
      // ==========================
      if (usuario.role === "aluno") {
        const alunoId = usuario.alunoId;
        if (alunoId === null) {
          return res.status(400).json({
            message: "Aluno sem ID associado",
          });
        }
        const aluno = await prisma.aluno.findUnique({
          where: {
            alunoId,
          },
        });

        if (!aluno) {
          return res.status(404).json({
            message: "Aluno não encontrado",
          });
        }

        const disciplinas = await prisma.disciplina.count({
          where: {
            cursoId: aluno.cursoId,
          },
        });

        const boletins = await prisma.boletim.count({
          where: {
            alunoId,
          },
        });

        return res.json({
          disciplinas,
          boletins,
        });
      }

      return res.status(403).json({
        message: "Usuário sem permissão",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao carregar dashboard",
      });
    }
  }
}