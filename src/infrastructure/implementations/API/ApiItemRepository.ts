import { SearchResult, Product, ProductResult } from '../../../domain/entities';
import { ProductRepository } from '../../../domain/repositories/ProductRepository'

export class ApiItemRepository implements ProductRepository {
  private readonly _searchResult: SearchResult = {
    author: {
      name: 'jhon',
      lastname: 'Padilla'
    },
    categories: ['Categoria 1', 'Categoria 2'],
    items: []
  }  

  private readonly _product: Product = {
    id: '1',
    title: '',
    description: '',
    condition: '',
    picture: '',
    free_shipping: false,
    sold_quantity: 0,
    price: {
        amount: 0,
        currency: '',
        decimals: 0
    }  
  }

  async getAll(keyword: string): Promise<SearchResult> {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${keyword}`

    const result = await fetch(url)
    const res = await result.json()

    const { results, filters } = res

    const productList = results.map((product: { id: string; title: string; currency_id: string; price: number; thumbnail: string; condition: string; shipping: { free_shipping: boolean; }; sold_quantity: number; }) => {
        return {
            id: product.id,
            title: product.title,
            price: {
                currency: product.currency_id,
                amount: product.price,
                decimals: 0,
            },
            picture: product.thumbnail,
            condition: product.condition,
            free_shipping: product.shipping.free_shipping,
            sold_quantity: product.sold_quantity,
            description: ''
        }
    });

    const filter = filters?.find((filter: { id: string; }) => filter.id === 'category')

    const categories = filter && filter.values ? filter.values[0].path_from_root.map((category: { name: any; }) => {
        return category.name
    }) : []

    return {
        author: {
            name: 'Jhon',
            lastname: 'Padilla'
        },
        categories: categories,
        items: productList
    }
  }

  async getById(id: string): Promise<ProductResult> {
    const url = `https://api.mercadolibre.com/items/${id}`
    const result = await fetch(url)
    const res = await result.json()

    const productResult: ProductResult = {
        author: {
          name: 'Jhon',
          lastname: 'Padilla'
        },
        item: {
            id: res.id,
            title: res.title,
            price: {
                currency: res.currency_id,
                amount: res.price,
                decimals: 0,
            },
            picture: res.pictures && res.pictures[0].url    ,
            condition: res.condition,
            free_shipping: res.free_shipping,
            sold_quantity: res.sold_quantity,
            description: ''
        }
    }

    return productResult
  }

  
  async getDescription(id: string): Promise<string> {
    const url = `https://api.mercadolibre.com/items/${id}/description`
    const result = await fetch(url)
    const res = await result.json()

    const productDescription: string = res.plain_text

    return productDescription
  }
}