import { Router } from 'express'

import {
  createSubcategory,
  fetchSubcategories,
  fetchSubcategory,
  removeSubcategory,
  editSubcategory
} from './subcategory.controller.js'

import {
  validateCreateSubcategorySchema,
  validateUniqueSubcategory,
  validateSubcategoryExistence,
  validateRemoveSubcategory,
  validateUpdateSubcategorySchema,
  validateUniqueSubcategoryPUT
} from './subcategory.middleware.js'

const router = Router()

router.post('/', [
  validateCreateSubcategorySchema,
  validateUniqueSubcategory,
  createSubcategory,
])

router.get('/', [fetchSubcategories])

router.get('/:subcategoryID', [fetchSubcategory])

router.delete('/:subcategoryID', [
  validateRemoveSubcategory,
  validateSubcategoryExistence,
  removeSubcategory,
])

router.put('/:subcategoryID', [
  validateUpdateSubcategorySchema,
  validateSubcategoryExistence,
  validateUniqueSubcategoryPUT,
  editSubcategory,
])

export default router
