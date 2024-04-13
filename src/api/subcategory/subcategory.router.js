import { Router } from 'express'

import {
  createSubcategory,
  fetchSubcategories,
  fetchSubcategory,
  editSubcategory,
  removeSubcategory,
} from './subcategory.controller.js'
import {
  validateCreateSubcategorySchema,
  validateFetchSubcategoriesSchema,
  validateFetchSubcategorySchema,
  validateEditSubcategorySchema,
  validateRemoveSubcategorySchema,
  validateUniqueSubcategory,
  //validateSubcategoriesExistence, //Não está sendo usado
  validateSubcategoryExistence,
} from './subcategory.middleware.js'

const router = Router()

router.post('/', [
  validateCreateSubcategorySchema,
  validateUniqueSubcategory,
  createSubcategory,
])

router.get('/', [validateFetchSubcategoriesSchema, fetchSubcategories])

router.get('/:subcategoryID', [
  validateFetchSubcategorySchema,
  validateSubcategoryExistence,
  fetchSubcategory,
])

router.put('/:subcategoryID', [
  validateEditSubcategorySchema,
  validateSubcategoryExistence,
  validateUniqueSubcategory,
  editSubcategory,
])

router.delete('/:subcategoryID', [
  validateRemoveSubcategorySchema,
  validateSubcategoryExistence,
  removeSubcategory,
])

export default router
