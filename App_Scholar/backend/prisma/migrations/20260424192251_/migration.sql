/*
  Warnings:

  - The primary key for the `Boletim` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Boletim` table. All the data in the column will be lost.
  - The required column `boletimId` was added to the `Boletim` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Boletim" DROP CONSTRAINT "Boletim_pkey",
DROP COLUMN "id",
ADD COLUMN     "boletimId" TEXT NOT NULL,
ADD CONSTRAINT "Boletim_pkey" PRIMARY KEY ("boletimId");
