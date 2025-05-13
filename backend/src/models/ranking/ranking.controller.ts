//RECIBE LA PETICIÓN HTTP Y EL CONTROLADOR ESPERA UN RESULTADO Y LO MUESTRA
import { NextFunction, Request, Response } from 'express'
import { grupoService } from './ranking.service'

//DEVUELVE EL ARRAY DE TODO
export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const grupo = await grupoService.findAll()

        res.json(grupo)
    } catch (error) {
        next(error)
    }
}

//DEVUELVE EL DATO CONCRETO
export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

       const grupo = await grupoService.findOne(id)
        res.json(grupo)
    }
    catch (error) {
        next(error)
    }
}
