/*
  Warnings:

  - You are about to drop the column `correcta` on the `customizable` table. All the data in the column will be lost.
  - You are about to drop the column `explicación` on the `customizable` table. All the data in the column will be lost.
  - You are about to drop the column `opción_a` on the `customizable` table. All the data in the column will be lost.
  - You are about to drop the column `opción_b` on the `customizable` table. All the data in the column will be lost.
  - You are about to drop the column `opción_c` on the `customizable` table. All the data in the column will be lost.
  - You are about to drop the column `opción_d` on the `customizable` table. All the data in the column will be lost.
  - You are about to drop the column `puntuación` on the `customizable` table. All the data in the column will be lost.
  - Added the required column `opcion1` to the `Customizable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opcion2` to the `Customizable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opcion3` to the `Customizable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opcion4` to the `Customizable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `respuesta_correcta` to the `Customizable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customizable` DROP COLUMN `correcta`,
    DROP COLUMN `explicación`,
    DROP COLUMN `opción_a`,
    DROP COLUMN `opción_b`,
    DROP COLUMN `opción_c`,
    DROP COLUMN `opción_d`,
    DROP COLUMN `puntuación`,
    ADD COLUMN `explicacion` VARCHAR(191) NULL,
    ADD COLUMN `opcion1` VARCHAR(191) NOT NULL,
    ADD COLUMN `opcion2` VARCHAR(191) NOT NULL,
    ADD COLUMN `opcion3` VARCHAR(191) NOT NULL,
    ADD COLUMN `opcion4` VARCHAR(191) NOT NULL,
    ADD COLUMN `puntuacion` INTEGER NOT NULL DEFAULT 10,
    ADD COLUMN `respuesta_correcta` VARCHAR(191) NOT NULL;
