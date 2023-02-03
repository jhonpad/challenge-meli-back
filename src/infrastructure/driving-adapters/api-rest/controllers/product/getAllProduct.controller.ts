import { GetAllProductUseCase } from '../../../../../application/usecases/product/getAllProduct';
import { NextFunction, Response, Request } from "express";
import { ApiItemRepository } from "../../../../implementations/API/ApiItemRepository";

export const getAllProduct = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const productGetAllUseCase = new GetAllProductUseCase(new ApiItemRepository)
    const {search} = req.query
    
    try {
        const searchResult = await productGetAllUseCase.run(search as string)
        res.json(searchResult)
        return
    } catch (error) {
        return next(error)
    }
}