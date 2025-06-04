-- CreateTable
CREATE TABLE `RespuestaCustomizable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `equipoId` INTEGER NOT NULL,
    `customizableId` INTEGER NOT NULL,
    `esCorrecta` BOOLEAN NOT NULL,

    INDEX `RespuestaCustomizable_equipoId_idx`(`equipoId`),
    INDEX `RespuestaCustomizable_customizableId_idx`(`customizableId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RespuestaCustomizable` ADD CONSTRAINT `RespuestaCustomizable_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `Equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RespuestaCustomizable` ADD CONSTRAINT `RespuestaCustomizable_customizableId_fkey` FOREIGN KEY (`customizableId`) REFERENCES `Customizable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
