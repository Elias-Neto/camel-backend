import { Router } from 'express'

import {
  createCategory,
  fetchCategories,
  fetchCategory,
  removeCategory,
  editCategory,
} from './categories.controller.js'

import {
  validateCreateCategorySchema,
  validateUniqueCategory,
  validateCategoryExistence,
  validateRemoveCategorySchema,
  validateUpdateCategorySchema,
  validateFetchCategoriesSchema,
  validateFetchCategorySchema,
} from './categories.middleware.js'

const router = Router()

router.post('/', [
  validateCreateCategorySchema,
  validateUniqueCategory,
  createCategory,
])

router.get('/', [validateFetchCategoriesSchema, fetchCategories])

router.get('/:categoryID', [
  validateFetchCategorySchema,
  validateCategoryExistence,
  fetchCategory,
])

router.delete('/:categoryID', [
  validateRemoveCategorySchema,
  validateCategoryExistence,
  removeCategory,
  // validateRemoveExampleSchema,
  // validateExampleExistence,
  // removeExample,
])

router.put('/:categoryID', [
  validateUpdateCategorySchema,
  validateCategoryExistence,
  validateUniqueCategory,
  editCategory,
])

export default router
