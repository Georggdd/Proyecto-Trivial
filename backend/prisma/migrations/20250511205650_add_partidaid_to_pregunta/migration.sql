/*
  Warnings:

  - You are about to drop the column `integrantes` on the `equipo` table. All the data in the column will be lost.
  - You are about to drop the column `puntos` on the `equipo` table. All the data in the column will be lost.
  - You are about to drop the column `codigo` on the `partida` table. All the data in the column will be lost.
  - You are about to drop the column `creadaEn` on the `partida` table. All the data in the column will be lost.
  - The primary key for the `pregunta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `pregunta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `asignatura` on the `pregunta` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `dificultad` on the `pregunta` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.
  - The primary key for the `respuesta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `respuesta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `preguntaId` on the `respuesta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `nombre` to the `Partida` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partidaId` to the `Pregunta` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Partida_codigo_key` ON `partida`;

-- DropIndex
DROP INDEX `Respuesta_preguntaId_fkey` ON `respuesta`;

-- AlterTable
ALTER TABLE `equipo` DROP COLUMN `integrantes`,
    DROP COLUMN `puntos`,
    ADD COLUMN `imagen` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `partida` DROP COLUMN `codigo`,
    DROP COLUMN `creadaEn`,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL DEFAULT 'Partida generada';

-- AlterTable
ALTER TABLE `pregunta` DROP PRIMARY KEY,
    ADD COLUMN `partidaId` INTEGER NOT NULL DEFAULT 1,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `asignatura` VARCHAR(191) NOT NULL,
    MODIFY `dificultad` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `respuesta` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `preguntaId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Pregunta` ADD CONSTRAINT `Pregunta_partidaId_fkey` FOREIGN KEY (`partidaId`) REFERENCES `Partida`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Respuesta` ADD CONSTRAINT `Respuesta_preguntaId_fkey` FOREIGN KEY (`preguntaId`) REFERENCES `Pregunta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
