/*
  Warnings:

  - A unique constraint covering the columns `[alunoEmail]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cursoNome]` on the table `Curso` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[professorEmail]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[alunoId]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[professorId]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "alunoId" TEXT,
ADD COLUMN     "professorId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_alunoEmail_key" ON "Aluno"("alunoEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Curso_cursoNome_key" ON "Curso"("cursoNome");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_professorEmail_key" ON "Professor"("professorEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_alunoId_key" ON "Usuario"("alunoId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_professorId_key" ON "Usuario"("professorId");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("alunoId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("professorId") ON DELETE SET NULL ON UPDATE CASCADE;
