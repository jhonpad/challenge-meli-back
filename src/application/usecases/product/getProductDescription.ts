import type { ProductRepository } from '../../../domain/repositories/ProductRepository'

export class GetProductDescriptionUseCase {
  private readonly _productRepository: ProductRepository

  constructor (userRepository: ProductRepository) {
    this._productRepository = userRepository
  }

  async run (id: string): Promise<string> {
    const description: string = await this._productRepository.getDescription(id)

    return description
  }
}
