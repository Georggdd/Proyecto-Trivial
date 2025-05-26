/*
  Warnings:

  - You are about to drop the column `createdAt` on the `customizable` table. All the data in the column will be lost.
  - You are about to drop the column `puntuacion` on the `customizable` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `customizable` table. All the data in the column will be lost.
  - You are about to alter the column `dificultad` on the `customizable` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Int`.
  - The primary key for the `partida` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `partida` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `partida` table. All the data in the column will be lost.
  - You are about to alter the column `estado` on the `partida` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(1))`.
  - The primary key for the `pregunta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoriaId` on the `pregunta` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `pregunta` table. All the data in the column will be lost.
  - You are about to drop the column `puntuacion` on the `pregunta` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `pregunta` table. All the data in the column will be lost.
  - The values [media] on the enum `pregunta_dificultad` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `respuesta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `respuesta` table. All the data in the column will be lost.
  - You are about to drop the column `explicacion` on the `respuesta` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `respuesta` table. All the data in the column will be lost.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rol` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `equipo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[usuario]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.
  - Made the column `explicacion` on table `customizable` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profesorId` on table `partida` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `asignatura` to the `pregunta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `equipo` DROP FOREIGN KEY `Equipo_partidaId_fkey`;

-- DropForeignKey
ALTER TABLE `partida` DROP FOREIGN KEY `Partida_profesorId_fkey`;

-- DropForeignKey
ALTER TABLE `pregunta` DROP FOREIGN KEY `Pregunta_categoriaId_fkey`;

-- DropForeignKey
ALTER TABLE `respuesta` DROP FOREIGN KEY `Respuesta_preguntaId_fkey`;

-- DropIndex
DROP INDEX `Pregunta_categoriaId_fkey` ON `pregunta`;

-- DropIndex
DROP INDEX `Usuario_username_key` ON `usuario`;

-- AlterTable
ALTER TABLE `customizable` DROP COLUMN `createdAt`,
    DROP COLUMN `puntuacion`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `customizable` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `dificultad` INTEGER NOT NULL,
    MODIFY `explicacion` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `partida` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `estado` ENUM('esperando', 'en_curso', 'finalizada') NOT NULL,
    MODIFY `profesorId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `pregunta` DROP PRIMARY KEY,
    DROP COLUMN `categoriaId`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `puntuacion`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `asignatura` ENUM('Matematicas', 'Historia', 'Ciencias', 'Lengua', 'Ingles', 'Música') NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `dificultad` ENUM('facil', 'intermedia', 'dificil') NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `respuesta` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `explicacion`,
    DROP COLUMN `updatedAt`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `preguntaId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `usuario` DROP PRIMARY KEY,
    DROP COLUMN `rol`,
    DROP COLUMN `username`,
    ADD COLUMN `usuario` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `categoria`;

-- DropTable
DROP TABLE `equipo`;

-- CreateTable
CREATE TABLE `_partidatorespuestapartida` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    INDEX `_PartidaToRespuestaPartida_B_index`(`B`),
    UNIQUE INDEX `_PartidaToRespuestaPartida_AB_unique`(`A`, `B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `casilla` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` ENUM('normal', 'suerte', 'mala_suerte') NOT NULL,
    `efecto` VARCHAR(191) NOT NULL,
    `posicion` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grupo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `partidaId` VARCHAR(191) NOT NULL,

    INDEX `Grupo_partidaId_fkey`(`partidaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `integrante` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `grupoId` VARCHAR(191) NOT NULL,

    INDEX `Integrante_grupoId_fkey`(`grupoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `puntuaciongrupo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grupoId` INTEGER NOT NULL,
    `partidaId` VARCHAR(191) NOT NULL,
    `puntosTotales` INTEGER NOT NULL,

    UNIQUE INDEX `PuntuacionGrupo_grupoId_key`(`grupoId`),
    INDEX `PuntuacionGrupo_partidaId_fkey`(`partidaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `respuestapartida` (
    `id` VARCHAR(191) NOT NULL,
    `grupoId` VARCHAR(191) NOT NULL,
    `preguntaId` VARCHAR(191) NOT NULL,
    `respuestaId` VARCHAR(191) NOT NULL,
    `esCorrecta` BOOLEAN NOT NULL,
    `puntosObtenidos` INTEGER NOT NULL,
    `comodinActivado` BOOLEAN NOT NULL DEFAULT false,

    INDEX `RespuestaPartida_grupoId_fkey`(`grupoId`),
    INDEX `RespuestaPartida_preguntaId_fkey`(`preguntaId`),
    INDEX `RespuestaPartida_respuestaId_fkey`(`respuestaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `usuario_usuario_key` ON `usuario`(`usuario`);

-- AddForeignKey
ALTER TABLE `puntuaciongrupo` ADD CONSTRAINT `puntuaciongrupo_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
