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
    `id` VARCHAR(191) NOT NULL,
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
CREATE TABLE `PartidaRespuestaPartida` (
    `id` VARCHAR(191) NOT NULL,
    `partidaId` VARCHAR(191) NOT NULL,
    `respuestaId` VARCHAR(191) NOT NULL,
    `correcta` BOOLEAN NOT NULL,

    INDEX `PartidaRespuestaPartida_partidaId_idx`(`partidaId`),
    INDEX `PartidaRespuestaPartida_respuestaId_idx`(`respuestaId`),
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
    INDEX `Partida_profesorId_fkey`(`profesorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pregunta` (
    `id` VARCHAR(191) NOT NULL,
    `enunciado` VARCHAR(191) NOT NULL,
    `dificultad` ENUM('facil', 'intermedia', 'dificil') NOT NULL,
    `puntuacion` INTEGER NOT NULL,
    `probabilidad` DOUBLE NOT NULL,
    `explicacion` VARCHAR(191) NULL,
    `categoriaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Respuesta` (
    `id` VARCHAR(191) NOT NULL,
    `texto` VARCHAR(191) NOT NULL,
    `esCorrecta` BOOLEAN NOT NULL,
    `preguntaId` VARCHAR(191) NOT NULL,

    INDEX `Respuesta_preguntaId_fkey`(`preguntaId`),
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

    INDEX `RespuestaPartida_grupoId_fkey`(`grupoId`),
    INDEX `RespuestaPartida_preguntaId_fkey`(`preguntaId`),
    INDEX `RespuestaPartida_respuestaId_fkey`(`respuestaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `puntuaciongrupo` (
    `id` VARCHAR(191) NOT NULL,
    `grupoId` VARCHAR(191) NOT NULL,
    `partidaId` VARCHAR(191) NOT NULL,
    `puntosTotales` INTEGER NOT NULL,

    UNIQUE INDEX `PuntuacionGrupo_grupoId_key`(`grupoId`),
    INDEX `PuntuacionGrupo_partidaId_fkey`(`partidaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tirada` (
    `id` VARCHAR(191) NOT NULL,
    `grupoId` VARCHAR(191) NOT NULL,
    `partidaId` VARCHAR(191) NOT NULL,
    `valorDado` INTEGER NOT NULL,
    `casillaId` VARCHAR(191) NOT NULL,
    `fechaTirada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Tirada_casillaId_fkey`(`casillaId`),
    INDEX `Tirada_grupoId_fkey`(`grupoId`),
    INDEX `Tirada_partidaId_fkey`(`partidaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` VARCHAR(191) NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `usuario_usuario_key`(`usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PartidaRespuestaPartida` ADD CONSTRAINT `PartidaRespuestaPartida_partidaId_fkey` FOREIGN KEY (`partidaId`) REFERENCES `Partida`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartidaRespuestaPartida` ADD CONSTRAINT `PartidaRespuestaPartida_respuestaId_fkey` FOREIGN KEY (`respuestaId`) REFERENCES `Respuesta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pregunta` ADD CONSTRAINT `Pregunta_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Respuesta` ADD CONSTRAINT `Respuesta_preguntaId_fkey` FOREIGN KEY (`preguntaId`) REFERENCES `Pregunta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
