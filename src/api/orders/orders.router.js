import { Router } from 'express'

import { createOrder } from './orders.controller.js'
import { validateCreateOrderSchema } from './orders.middleware.js'
import { validateUserExistence } from '../users/users.middleware.js'
import { validateProductsExistence } from '../products/products.middleware.js'

const router = Router()

router.post('/', [
  validateCreateOrderSchema,
  validateUserExistence,
  validateProductsExistence,
  createOrder,
])

export default router
