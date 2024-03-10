import { Router } from 'express'

import {
  createCategory,
  fetchCategories,
  removeCategory,
  editCategory,
} from './category.controller.js'

import {
  validateCreateCategorySchema,
  validateUniqueCategory,
  validateCategoryExistence,
  validateRemoveCategory,
  validateUpdateCategorySchema,
  validateUniqueCategoryPUT,
} from './category.middleware.js'

const router = Router()

router.post('/', [validateCreateCategorySchema, validateUniqueCategory, createCategory])

router.get('/', [fetchCategories])

router.delete('/:categoryID', [
  validateRemoveCategory,
  validateCategoryExistence,
  removeCategory,
])

router.put('/:categoryID', [
  validateUpdateCategorySchema,
  validateCategoryExistence,
  validateUniqueCategoryPUT,
  editCategory,
])

export default router
