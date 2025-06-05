/*
  Warnings:

  - A unique constraint covering the columns `[equipoId,preguntaId]` on the table `RespuestaPartida` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `equipo` ADD COLUMN `avatar` VARCHAR(191) NULL,
    ADD COLUMN `quesitosUnicos` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `quesitosVisitados` JSON NULL,
    ADD COLUMN `respuestasPartidaJson` JSON NULL;

-- AlterTable
ALTER TABLE `pregunta` MODIFY `dificultad` ENUM('facil', 'media', 'dificil') NOT NULL DEFAULT 'facil';

-- AlterTable
ALTER TABLE `respuestacustomizable` 
    ADD COLUMN `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX `RespuestaPartida_equipoId_preguntaId_key` ON `RespuestaPartida`(`equipoId`, `preguntaId`);
