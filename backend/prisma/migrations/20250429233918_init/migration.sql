/*
  Warnings:

  - The primary key for the `partida` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `estado` on the `partida` table. All the data in the column will be lost.
  - You are about to drop the column `fechaCreacion` on the `partida` table. All the data in the column will be lost.
  - You are about to drop the column `profesorId` on the `partida` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `partida` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `grupo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `Partida_profesorId_fkey` ON `partida`;

-- AlterTable
ALTER TABLE `partida` DROP PRIMARY KEY,
    DROP COLUMN `estado`,
    DROP COLUMN `fechaCreacion`,
    DROP COLUMN `profesorId`,
    ADD COLUMN `creadaEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `grupo`;

-- CreateTable
CREATE TABLE `Equipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `integrantes` VARCHAR(191) NOT NULL,
    `puntos` INTEGER NOT NULL DEFAULT 0,
    `partidaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Equipo` ADD CONSTRAINT `Equipo_partidaId_fkey` FOREIGN KEY (`partidaId`) REFERENCES `Partida`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
