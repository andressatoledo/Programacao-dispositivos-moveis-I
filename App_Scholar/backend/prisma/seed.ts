import {
  PrismaClient,
  Role,
  CursoPeriodo,
  BoletimSituacao,
} from "@prisma/client";

import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando seed...");

  // ======================================================
  // ADMIN
  // ======================================================

  const senhaAdmin = await bcrypt.hash("123456", 10);

  await prisma.usuario.upsert({
    where: { usuarioEmail: "admin@appscholar.com" },
    update: {},
    create: {
      usuarioNome: "Administrador",
      usuarioEmail: "admin@appscholar.com",
      usuarioSenha: senhaAdmin,
      usuarioRole: Role.admin,
    },
  });

  // ======================================================
  // CURSOS
  // ======================================================

  const cursoADS = await prisma.curso.create({
    data: {
      cursoNome: "Análise e Desenvolvimento de Sistemas",
      cursoPeriodo: CursoPeriodo.Noturno,
      cursoMediaAprovacao: 6,
      cursoDuracao: 6,
    },
  });

  const cursoEngenharia = await prisma.curso.create({
    data: {
      cursoNome: "Engenharia de Software",
      cursoPeriodo: CursoPeriodo.Integral,
      cursoMediaAprovacao: 7,
      cursoDuracao: 8,
    },
  });

  // ======================================================
  // PROFESSORES + USUÁRIO
  // ======================================================

  const senhaProf = await bcrypt.hash("123456", 10);

  const professor1 = await prisma.professor.create({
    data: {
      professorNome: "Carlos Henrique",
      professorTitulacao: "Mestre",
      professorAreaAtuacao: "Backend",
      professorTempoDocencia: 12,
      professorEmail: "carlos@appscholar.com",

      usuario: {
        create: {
          usuarioNome: "Carlos Henrique",
          usuarioEmail: "carlos@appscholar.com",
          usuarioSenha: senhaProf,
          usuarioRole: Role.professor,
        },
      },
    },
  });

  const professor2 = await prisma.professor.create({
    data: {
      professorNome: "Fernanda Lima",
      professorTitulacao: "Doutora",
      professorAreaAtuacao: "Banco de Dados",
      professorTempoDocencia: 15,
      professorEmail: "fernanda@appscholar.com",

      usuario: {
        create: {
          usuarioNome: "Fernanda Lima",
          usuarioEmail: "fernanda@appscholar.com",
          usuarioSenha: senhaProf,
          usuarioRole: Role.professor,
        },
      },
    },
  });

  // ======================================================
  // DISCIPLINAS
  // ======================================================

  const disciplina1 = await prisma.disciplina.create({
    data: {
      disciplinaNome: "Programação Backend",
      disciplinaCargaHoraria: 80,
      disciplinaSemestre: 3,
      professorId: professor1.professorId,
      cursoId: cursoADS.cursoId,
    },
  });

  const disciplina2 = await prisma.disciplina.create({
    data: {
      disciplinaNome: "Banco de Dados",
      disciplinaCargaHoraria: 80,
      disciplinaSemestre: 2,
      professorId: professor2.professorId,
      cursoId: cursoADS.cursoId,
    },
  });

  const disciplina3 = await prisma.disciplina.create({
    data: {
      disciplinaNome: "Engenharia de Requisitos",
      disciplinaCargaHoraria: 60,
      disciplinaSemestre: 1,
      professorId: professor1.professorId,
      cursoId: cursoEngenharia.cursoId,
    },
  });

  const disciplina4 = await prisma.disciplina.create({
    data: {
      disciplinaNome: "Arquitetura de Software",
      disciplinaCargaHoraria: 80,
      disciplinaSemestre: 4,
      professorId: professor2.professorId,
      cursoId: cursoEngenharia.cursoId,
    },
  });

  // ======================================================
  // ALUNOS + USUÁRIO
  // ======================================================

  const senhaAluno = await bcrypt.hash("123456", 10);

  const aluno1 = await prisma.aluno.create({
    data: {
      alunoNome: "João Pedro",
      alunoMatricula: "2026001",
      alunoEmail: "joao@aluno.appscholar.com",
      alunoTelefone: "(12) 99999-1111",
      alunoCep: "76824-512",
      alunoEndereco: "Rua Roberto de Souza",
      alunoCidade: "1100205",
      alunoEstado: "11",
      cursoId: cursoADS.cursoId,

      usuario: {
        create: {
          usuarioNome: "João Pedro",
          usuarioEmail: "joao@aluno.appscholar.com",
          usuarioSenha: senhaAluno,
          usuarioRole: Role.aluno,
        },
      },
    },
  });

  const aluno2 = await prisma.aluno.create({
    data: {
      alunoNome: "Mariana Souza",
      alunoMatricula: "2026002",
      alunoEmail: "mariana@aluno.appscholar.com",
      alunoTelefone: "(12) 99999-2222",
      alunoCep: "79906-884",
      alunoEndereco: "Rua Isaac Newton",
      alunoCidade: "5006606",
      alunoEstado: "50",
      cursoId: cursoEngenharia.cursoId,

      usuario: {
        create: {
          usuarioNome: "Mariana Souza",
          usuarioEmail: "mariana@aluno.appscholar.com",
          usuarioSenha: senhaAluno,
          usuarioRole: Role.aluno,
        },
      },
    },
  });

  // ======================================================
  // BOLETINS
  // ======================================================

  await prisma.boletim.createMany({
    data: [
      {
        alunoId: aluno1.alunoId,
        disciplinaId: disciplina1.disciplinaId,
        boletimNota1: 8,
        boletimNota2: 9,
        boletimMedia: 8.5,
        boletimSituacao: BoletimSituacao.Aprovado,
      },
      {
        alunoId: aluno1.alunoId,
        disciplinaId: disciplina2.disciplinaId,
        boletimNota1: 5,
        boletimNota2: 6,
        boletimMedia: 5.5,
        boletimSituacao: BoletimSituacao.EmRecuperacao,
      },
      {
        alunoId: aluno2.alunoId,
        disciplinaId: disciplina3.disciplinaId,
        boletimNota1: 9,
        boletimNota2: 8,
        boletimMedia: 8.5,
        boletimSituacao: BoletimSituacao.Aprovado,
      },
      {
        alunoId: aluno2.alunoId,
        disciplinaId: disciplina4.disciplinaId,
        boletimNota1: 4,
        boletimNota2: 5,
        boletimMedia: 4.5,
        boletimSituacao: BoletimSituacao.Reprovado,
      },
    ],
  });

  console.log("Seed finalizada com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });