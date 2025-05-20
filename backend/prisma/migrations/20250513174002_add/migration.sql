-- AlterTable
ALTER TABLE `pregunta` MODIFY `asignatura` ENUM('Matematicas', 'Historia', 'Ciencias', 'Lengua', 'Ingles', 'Música') NOT NULL;

-- CreateTable
CREATE TABLE `customizable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pregunta` VARCHAR(191) NOT NULL,
    `opcion1` VARCHAR(191) NOT NULL,
    `opcion2` VARCHAR(191) NOT NULL,
    `opcion3` VARCHAR(191) NOT NULL,
    `opcion4` VARCHAR(191) NOT NULL,
    `respuesta_correcta` VARCHAR(191) NOT NULL,
    `dificultad` VARCHAR(191) NOT NULL,
    `explicacion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
