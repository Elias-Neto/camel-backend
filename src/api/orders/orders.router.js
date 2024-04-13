import { Router } from 'express'

import { createOrder, fetchOrder } from './orders.controller.js'
import {
  validateCreateOrderSchema,
  validateFetchOrdersSchema,
  validateOrdersExistence,
} from './orders.middleware.js'
import { validateUserExistence } from '../users/users.middleware.js'
import { validateProductsExistence } from '../products/products.middleware.js'

const router = Router()

router.post('/', [
  validateCreateOrderSchema,
  validateUserExistence,
  validateProductsExistence,
  createOrder,
])

router.get('/:orderID', [
  validateFetchOrdersSchema,
  validateOrdersExistence,
  fetchOrder,
])

export default router
