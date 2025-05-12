-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` ENUM('admin', 'profesor') NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Partida` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `estado` ENUM('esperando', 'en_curso', 'finalizada') NOT NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `profesorId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Partida_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grupo` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `partidaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Integrante` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `grupoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pregunta` (
    `id` VARCHAR(191) NOT NULL,
    `asignatura` ENUM('Matematicas', 'Historia', 'Ciencias', 'Lengua', 'Ingles') NOT NULL,
    `dificultad` ENUM('baja', 'media', 'alta') NOT NULL,
    `texto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Respuesta` (
    `id` VARCHAR(191) NOT NULL,
    `preguntaId` VARCHAR(191) NOT NULL,
    `texto` VARCHAR(191) NOT NULL,
    `esCorrecta` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Casilla` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` ENUM('normal', 'suerte', 'mala_suerte') NOT NULL,
    `efecto` VARCHAR(191) NOT NULL,
    `posicion` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tirada` (
    `id` VARCHAR(191) NOT NULL,
    `grupoId` VARCHAR(191) NOT NULL,
    `partidaId` VARCHAR(191) NOT NULL,
    `valorDado` INTEGER NOT NULL,
    `casillaId` VARCHAR(191) NOT NULL,
    `fechaTirada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RespuestaPartida` (
    `id` VARCHAR(191) NOT NULL,
    `grupoId` VARCHAR(191) NOT NULL,
    `preguntaId` VARCHAR(191) NOT NULL,
    `respuestaId` VARCHAR(191) NOT NULL,
    `esCorrecta` BOOLEAN NOT NULL,
    `puntosObtenidos` INTEGER NOT NULL,
    `comodinActivado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PuntuacionGrupo` (
    `id` VARCHAR(191) NOT NULL,
    `grupoId` VARCHAR(191) NOT NULL,
    `partidaId` VARCHAR(191) NOT NULL,
    `puntosTotales` INTEGER NOT NULL,

    UNIQUE INDEX `PuntuacionGrupo_grupoId_key`(`grupoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PartidaToRespuestaPartida` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_PartidaToRespuestaPartida_AB_unique`(`A`, `B`),
    INDEX `_PartidaToRespuestaPartida_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Partida` ADD CONSTRAINT `Partida_profesorId_fkey` FOREIGN KEY (`profesorId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grupo` ADD CONSTRAINT `Grupo_partidaId_fkey` FOREIGN KEY (`partidaId`) REFERENCES `Partida`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Integrante` ADD CONSTRAINT `Integrante_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `Grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Respuesta` ADD CONSTRAINT `Respuesta_preguntaId_fkey` FOREIGN KEY (`preguntaId`) REFERENCES `Pregunta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tirada` ADD CONSTRAINT `Tirada_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `Grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tirada` ADD CONSTRAINT `Tirada_partidaId_fkey` FOREIGN KEY (`partidaId`) REFERENCES `Partida`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tirada` ADD CONSTRAINT `Tirada_casillaId_fkey` FOREIGN KEY (`casillaId`) REFERENCES `Casilla`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RespuestaPartida` ADD CONSTRAINT `RespuestaPartida_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `Grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RespuestaPartida` ADD CONSTRAINT `RespuestaPartida_preguntaId_fkey` FOREIGN KEY (`preguntaId`) REFERENCES `Pregunta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RespuestaPartida` ADD CONSTRAINT `RespuestaPartida_respuestaId_fkey` FOREIGN KEY (`respuestaId`) REFERENCES `Respuesta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PuntuacionGrupo` ADD CONSTRAINT `PuntuacionGrupo_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `Grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PuntuacionGrupo` ADD CONSTRAINT `PuntuacionGrupo_partidaId_fkey` FOREIGN KEY (`partidaId`) REFERENCES `Partida`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PartidaToRespuestaPartida` ADD CONSTRAINT `_PartidaToRespuestaPartida_A_fkey` FOREIGN KEY (`A`) REFERENCES `Partida`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PartidaToRespuestaPartida` ADD CONSTRAINT `_PartidaToRespuestaPartida_B_fkey` FOREIGN KEY (`B`) REFERENCES `RespuestaPartida`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
