
import type { ProductResult, SearchResult } from '../entities'

export interface ProductRepository {
  getAll(keyword: string): Promise<SearchResult>
  getById(id: string): Promise<ProductResult>
}
