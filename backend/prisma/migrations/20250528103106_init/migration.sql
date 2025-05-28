/*
  Warnings:

  - You are about to drop the column `explicacion` on the `customizable` table. All the data in the column will be lost.
  - You are about to drop the column `puntuacion` on the `customizable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `customizable` DROP COLUMN `explicacion`,
    DROP COLUMN `puntuacion`,
    ADD COLUMN `explicación` VARCHAR(191) NULL,
    ADD COLUMN `puntuación` INTEGER NOT NULL DEFAULT 10;
