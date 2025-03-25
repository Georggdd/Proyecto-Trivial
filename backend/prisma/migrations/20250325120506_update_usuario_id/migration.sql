/*
  Warnings:

  - The values [baja,media,alta] on the enum `pregunta_dificultad` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `email` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `rol` on the `usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuario]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuario` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Usuario_email_key` ON `usuario`;

-- AlterTable
ALTER TABLE `pregunta` MODIFY `dificultad` ENUM('facil', 'intermedia', 'dificil') NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `email`,
    DROP COLUMN `nombre`,
    DROP COLUMN `rol`,
    ADD COLUMN `usuario` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `usuario_usuario_key` ON `usuario`(`usuario`);
