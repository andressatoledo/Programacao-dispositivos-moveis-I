-- CreateEnum
CREATE TYPE "CursoPeriodo" AS ENUM ('Matutino', 'Vespertino', 'Noturno', 'Integral');

-- CreateEnum
CREATE TYPE "BoletimSituacao" AS ENUM ('Aprovado', 'Reprovado', 'EmRecuperacao');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'professor', 'aluno');

-- CreateTable
CREATE TABLE "Aluno" (
    "alunoId" TEXT NOT NULL,
    "alunoNome" TEXT NOT NULL,
    "alunoMatricula" TEXT NOT NULL,
    "alunoEmail" TEXT NOT NULL,
    "alunoTelefone" TEXT NOT NULL,
    "alunoCep" TEXT NOT NULL,
    "alunoEndereco" TEXT NOT NULL,
    "alunoCidade" TEXT NOT NULL,
    "alunoEstado" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "alunoCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("alunoId")
);

-- CreateTable
CREATE TABLE "Professor" (
    "professorId" TEXT NOT NULL,
    "professorNome" TEXT NOT NULL,
    "professorTitulacao" TEXT NOT NULL,
    "professorAreaAtuacao" TEXT NOT NULL,
    "professorTempoDocencia" INTEGER NOT NULL,
    "professorEmail" TEXT NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("professorId")
);

-- CreateTable
CREATE TABLE "Curso" (
    "cursoId" TEXT NOT NULL,
    "cursoNome" TEXT NOT NULL,
    "cursoPeriodo" "CursoPeriodo" NOT NULL,
    "cursoMediaAprovacao" DOUBLE PRECISION,
    "cursoDuracao" INTEGER,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("cursoId")
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "disciplinaId" TEXT NOT NULL,
    "disciplinaNome" TEXT NOT NULL,
    "disciplinaCargaHoraria" INTEGER NOT NULL,
    "disciplinaSemestre" INTEGER NOT NULL,
    "professorId" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("disciplinaId")
);

-- CreateTable
CREATE TABLE "Boletim" (
    "id" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "disciplinaId" TEXT NOT NULL,
    "boletimNota1" DOUBLE PRECISION NOT NULL,
    "boletimNota2" DOUBLE PRECISION NOT NULL,
    "boletimMedia" DOUBLE PRECISION NOT NULL,
    "boletimSituacao" "BoletimSituacao" NOT NULL,
    "boletimCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Boletim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "usuarioId" TEXT NOT NULL,
    "usuarioNome" TEXT NOT NULL,
    "usuarioEmail" TEXT NOT NULL,
    "usuarioSenha" TEXT NOT NULL,
    "usuarioRole" "Role" NOT NULL DEFAULT 'aluno',
    "usuarioCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("usuarioId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_alunoMatricula_key" ON "Aluno"("alunoMatricula");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuarioEmail_key" ON "Usuario"("usuarioEmail");

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("cursoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("professorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("cursoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Boletim" ADD CONSTRAINT "Boletim_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("alunoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Boletim" ADD CONSTRAINT "Boletim_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("disciplinaId") ON DELETE RESTRICT ON UPDATE CASCADE;
