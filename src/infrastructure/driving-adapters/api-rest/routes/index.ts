import { ProductErrorException } from "../../../../domain/exceptions/ProductErrorException";
import {Request, Response, Router, NextFunction } from "express";
import productRoutes from './product.routes'

const route = Router()

route.use('/api/items', productRoutes)
route.use('/api/items/:id', productRoutes)

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof ProductErrorException) {
        res.status(400).json({
            message: 'Error en busqueda'
        })
    } else {
        next(err)
    }
})

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    res.status(500)
    res.json({
        error:err
    })
})

export default route