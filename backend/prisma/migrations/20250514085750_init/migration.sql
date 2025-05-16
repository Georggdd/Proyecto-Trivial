/*
  Warnings:

  - The primary key for the `grupo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `grupo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `puntuaciongrupo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `puntuaciongrupo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `grupoId` on the `puntuaciongrupo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `tirada` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `PuntuacionGrupo_grupoId_key` ON `puntuaciongrupo`;

-- AlterTable
ALTER TABLE `grupo` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `puntuaciongrupo` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL,
    MODIFY `grupoId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `tirada`;

-- AddForeignKey
ALTER TABLE `puntuaciongrupo` ADD CONSTRAINT `puntuaciongrupo_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
