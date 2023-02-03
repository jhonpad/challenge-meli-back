import type { SearchResult } from '../../../domain/entities'
import type { ProductRepository } from '../../../domain/repositories/ProductRepository'

export class GetAllProductUseCase {
  private readonly _productRepository: ProductRepository

  constructor (userRepository: ProductRepository) {
    this._productRepository = userRepository
  }

  async run (keyword: string): Promise<SearchResult> {
    const searchResult: SearchResult = await this._productRepository.getAll(keyword)

    return searchResult
  }
}
