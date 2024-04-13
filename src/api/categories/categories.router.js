import { Router } from 'express'

import {
  createCategory,
  fetchCategories,
  fetchCategory,
  removeCategory,
  editCategory,
  fetchSubcategoryOfACategory,
} from './categories.controller.js'

import {
  validateCreateCategorySchema,
  validateUniqueCategory,
  validateCategoryExistence,
  validateRemoveCategorySchema,
  validateUpdateCategorySchema,
  validateFetchCategoriesSchema,
  validateFetchCategorySchema,
  validateSubcategoryOfCategoryExistence,
} from './categories.middleware.js'

const router = Router()

router.post('/', [
  validateCreateCategorySchema,
  validateUniqueCategory,
  createCategory,
])

router.get('/', [validateFetchCategoriesSchema, fetchCategories])

router.get('/subcategory/:categoryID', [
  validateFetchCategorySchema,
  validateSubcategoryOfCategoryExistence,
  fetchSubcategoryOfACategory,
])

router.get('/:categoryID', [
  validateFetchCategorySchema,
  validateCategoryExistence,
  fetchCategory,
])

router.delete('/:categoryID', [
  validateRemoveCategorySchema,
  validateCategoryExistence,
  removeCategory,
])

router.put('/:categoryID', [
  validateUpdateCategorySchema,
  validateCategoryExistence,
  validateUniqueCategory,
  editCategory,
])

export default router
