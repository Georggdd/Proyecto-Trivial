/*
  Warnings:

  - You are about to drop the column `explicacion` on the `Pregunta` table. All the data in the column will be lost.
  - The values [intermedia] on the enum `Pregunta_dificultad` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Pregunta` DROP COLUMN `explicacion`,
    MODIFY `dificultad` ENUM('facil', 'media', 'dificil') NOT NULL;

-- AlterTable
ALTER TABLE `Respuesta` ADD COLUMN `explicacion` VARCHAR(191) NULL;
