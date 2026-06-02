-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "BoletimSituacao" ADD VALUE 'NaoCursado';
ALTER TYPE "BoletimSituacao" ADD VALUE 'EmAndamento';
ALTER TYPE "BoletimSituacao" ADD VALUE 'Trancado';

-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "alunoSemestreAtual" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Disciplina" ADD COLUMN     "disciplinaAtiva" BOOLEAN NOT NULL DEFAULT true;
