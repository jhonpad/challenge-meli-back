import { GetProductByIdUseCase } from '../../../../../application/usecases/product';
import { NextFunction, Response, Request } from "express";
import { ApiItemRepository } from "../../../../implementations/API/ApiItemRepository";

export const getProductByID = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const getProductByIdUseCase = new GetProductByIdUseCase(new ApiItemRepository)
   const { id } = req.params
    try {
        const product = await getProductByIdUseCase.run(id)
        res.json(product)
        return
    } catch (error) {
        return next(error)
    }
}