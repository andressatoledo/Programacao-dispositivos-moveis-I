import { prisma } from "../lib/prisma";
import { BoletimSituacao } from "@prisma/client";
export class BoletimService {
  static async calcularMedia(boletimId: string) {
    const boletim = await prisma.boletim.findUnique({
      where: {
        boletimId,
      },

      include: {
        disciplina: {
          include: {
            curso: true,
          },
        },
      },
    });

    if (!boletim) {
      throw new Error("Boletim não encontrado");
    }

    const media = (boletim.boletimNota1 + boletim.boletimNota2) / 2;

    const mediaAprovacao = boletim.disciplina.curso.cursoMediaAprovacao ?? 7;

    let situacao: BoletimSituacao;

    if (media >= mediaAprovacao) {
      situacao = "Aprovado";
    } else if (media >= mediaAprovacao - 2) {
      situacao = "EmRecuperacao";
    } else {
      situacao = "Reprovado";
    }

    return {
      media,
      situacao,
    };
  }

  static async sincronizarBoletim(boletimId: string) {
    const calculo = await this.calcularMedia(boletimId);

    return prisma.boletim.update({
      where: {
        boletimId,
      },

      data: {
        boletimMedia: calculo.media,

        boletimSituacao: calculo.situacao,
      },
    });
  }

  static async sincronizarAluno(alunoId: string) {
    const aluno = await prisma.aluno.findUnique({
      where: { alunoId },
      include: {
        curso: {
          include: {
            disciplinas: true,
          },
        },
        boletins: true,
      },
    });

    if (!aluno) throw new Error("Aluno não encontrado");

    const disciplinas = aluno.curso.disciplinas;

    const boletinsExistentes = aluno.boletins.map((b) => b.disciplinaId);

    // 1. CRIAR FALTANTES
    const faltantes = disciplinas.filter(
      (d) => !boletinsExistentes.includes(d.disciplinaId),
    );

    if (faltantes.length) {
      await prisma.boletim.createMany({
        data: faltantes.map((d) => ({
          alunoId: aluno.alunoId,
          disciplinaId: d.disciplinaId,
          boletimNota1: 0,
          boletimNota2: 0,
          boletimMedia: 0,
          boletimSituacao: "NaoCursado",
        })),
      });
    }

    // 2. REMOVER EXTRAS
    const disciplinasIds = disciplinas.map((d) => d.disciplinaId);

    await prisma.boletim.deleteMany({
      where: {
        alunoId: aluno.alunoId,
        disciplinaId: {
          notIn: disciplinasIds,
        },
      },
    });
  }

  static async sincronizarCurso(cursoId: string) {
    const alunos = await prisma.aluno.findMany({
      where: { cursoId },
      select: { alunoId: true },
    });

    await Promise.all(alunos.map((a) => this.sincronizarAluno(a.alunoId)));
  }
}
