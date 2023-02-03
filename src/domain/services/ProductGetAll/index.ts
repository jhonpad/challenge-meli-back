import type { SearchResult } from '../../entities'
import type { ProductRepository } from '../../repositories/ProductRepository'

export class ProductGetAll {
  private readonly _productRepository: ProductRepository

  constructor (productRepository: ProductRepository) {
    this._productRepository = productRepository
  }

  async run (keyword: string): Promise<SearchResult> {
    const searchResult: SearchResult = await this._productRepository.getAll(keyword)
    return searchResult
  }
}
