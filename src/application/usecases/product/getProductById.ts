import type { ProductResult } from '../../../domain/entities'
import type { ProductRepository } from '../../../domain/repositories/ProductRepository'
import { GetProductDescriptionUseCase } from './getProductDescription'

export class GetProductByIdUseCase {
  private readonly _productRepository: ProductRepository

  constructor (userRepository: ProductRepository) {
    this._productRepository = userRepository
  }

  async run (id: string): Promise<ProductResult> {
    const productResult: ProductResult = await this._productRepository.getById(id)
    const getProductDescriptionUseCase = new GetProductDescriptionUseCase(this._productRepository)
    productResult.item.description = await getProductDescriptionUseCase.run(id)
    return productResult
  }
}
