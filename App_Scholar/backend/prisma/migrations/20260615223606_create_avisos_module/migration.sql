-- CreateTable
CREATE TABLE "Aviso" (
    "avisoId" TEXT NOT NULL,
    "avisoTitulo" TEXT NOT NULL,
    "avisoMensagem" TEXT NOT NULL,
    "avisoAtivo" BOOLEAN NOT NULL DEFAULT true,
    "criadoPorId" TEXT NOT NULL,
    "cursoId" TEXT,
    "disciplinaId" TEXT,
    "avisoCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aviso_pkey" PRIMARY KEY ("avisoId")
);

-- CreateTable
CREATE TABLE "AvisoVisualizacao" (
    "avisoVisualizacaoId" TEXT NOT NULL,
    "avisoId" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "visualizadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AvisoVisualizacao_pkey" PRIMARY KEY ("avisoVisualizacaoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AvisoVisualizacao_avisoId_alunoId_key" ON "AvisoVisualizacao"("avisoId", "alunoId");

-- AddForeignKey
ALTER TABLE "Aviso" ADD CONSTRAINT "Aviso_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "Usuario"("usuarioId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aviso" ADD CONSTRAINT "Aviso_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("cursoId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aviso" ADD CONSTRAINT "Aviso_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("disciplinaId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvisoVisualizacao" ADD CONSTRAINT "AvisoVisualizacao_avisoId_fkey" FOREIGN KEY ("avisoId") REFERENCES "Aviso"("avisoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvisoVisualizacao" ADD CONSTRAINT "AvisoVisualizacao_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("alunoId") ON DELETE RESTRICT ON UPDATE CASCADE;
