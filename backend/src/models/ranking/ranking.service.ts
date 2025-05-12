// ACCEDE A LOS DATOS DEL MODELO GRUPO Y OBTIENE REGISTROS EN FUNCIÓN DE SU ID

import { grupo } from '@prisma/client';
import { prisma } from '../../../prisma/index';

class GrupoService { //Pascal Case
//BUSCA UN GRUPO POR SU ID
    async findOne(id: string): Promise<grupo | null> {
    return await prisma.grupo.findUnique({
        where: { id }
    });
    }

//DEVUELVE TODOS LOS GRUPOS
    async findAll(): Promise<grupo[]>{
        const grupos = await prisma.grupo.findMany()
       
        return grupos
    }
}

export const grupoService = new GrupoService(); //CamelCase