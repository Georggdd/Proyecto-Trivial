//función
//conexión con accesoGrupo.js
//escuchar servidor en backend (no Prisma) nodeserverpreuba2.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function obtenerGrupos() {
  return await prisma.grupo.findMany();
}