import { Router } from 'express'

import {
    getAllProductController,
    getProductByIdController
} from '../controllers/index'

const route = Router()

route.get('', getAllProductController)
route.get('/:id', getProductByIdController)

export default route