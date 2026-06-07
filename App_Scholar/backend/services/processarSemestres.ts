import { prisma } from "../lib/prisma";
export class ProcessarSemestresService {
  static async processarSemestres() {
    const alunos = await prisma.aluno.findMany({
      include: {
        curso: true,
      },
    });

    let atualizados = 0;

    for (const aluno of alunos) {
      const duracao = aluno.curso.cursoDuracao ?? 0;

      if (aluno.alunoSemestreAtual < duracao) {
        await prisma.aluno.update({
          where: {
            alunoId: aluno.alunoId,
          },

          data: {
            alunoSemestreAtual: aluno.alunoSemestreAtual + 1,
          },
        });

        atualizados++;
      }
    }

    return {
      total: alunos.length,
      atualizados,
    };
  }
}
