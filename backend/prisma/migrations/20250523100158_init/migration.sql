/*
  Warnings:

  - You are about to drop the column `dificultad` on the `customizable` table. All the data in the column will be lost.
  - Added the required column `puntuación` to the `customizable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customizable` DROP COLUMN `dificultad`,
    ADD COLUMN `puntuación` INTEGER NOT NULL;
