import { Router } from 'express'

import {
  createProduct,
  fetchProducts,
  fetchProduct,
  editProduct,
  removeProduct,
  fetchProductRecommendations,
} from './products.controller.js'
import {
  validateCreateProductSchema,
  validateFetchProductsSchema,
  validateFetchProductSchema,
  validateEditProductSchema,
  validateRemoveProductSchema,
  validateUniqueProduct,
  validateProductExistence,
  validateRecommendationProductSchema,
} from './products.middleware.js'

const router = Router()

router.post('/', [
  validateCreateProductSchema,
  validateUniqueProduct,
  createProduct,
])

router.get('/', [validateFetchProductsSchema, fetchProducts])

router.get('/:productID', [
  validateFetchProductSchema,
  validateProductExistence,
  fetchProduct,
])

router.put('/:productID', [
  validateEditProductSchema,
  validateProductExistence,
  validateUniqueProduct,
  editProduct,
])

router.delete('/:productID', [
  validateRemoveProductSchema,
  validateProductExistence,
  removeProduct,
])

router.get('/:productID/recommendations', [
  validateRecommendationProductSchema,
  validateProductExistence,
  fetchProductRecommendations,
])

export default router
