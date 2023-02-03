import type { Author } from './Autor'
import type { Product } from './Product'

export interface SearchResult {
  author: Author
  categories: string[]
  items: Product[]
}
