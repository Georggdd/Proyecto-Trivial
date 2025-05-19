import { PrismaClient } from '@prisma/client'; //conexión con la base de datos

const prisma = new PrismaClient(); //inicializa Prisma para realizar consultas

async function obtenerGrupo() {
    try {
        const grupo = await prisma.grupo.findMany(); //la función findMany devuelve una ProjectCreationMetaResponseModelType, por eso se usa await, hay que esperar
        console.log(grupo);

    } catch (error) {
        console.error('Error al obtener usuarios:', error);

    } finally {
        await prisma.$disconnect(); //cierra la conexión = recomendado

    }
}

obtenerGrupo()
