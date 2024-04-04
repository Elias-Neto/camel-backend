import { celebrate, Joi, Segments } from 'celebrate'

import {
  findSubcategoryByName,
  findSubcategoryByID,
  findSubcategoriesByIDs,
} from './subcategory.dao.js'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'
import { paginationBaseSchema } from '../../helpers/validations-helper.js'
import { isDefined, isNullOrUndefined } from '../../helpers/object-helper.js'

const paramsBaseSchema = {
  subcategoryID: Joi.string().uuid().required(),
}

const validateCreateSubcategorySchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string().optional(),
    type: Joi.string().required(),
  },
})

const validateFetchSubcategoriesSchema = celebrate({
  [Segments.QUERY]: {
    ...paginationBaseSchema,
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    type: Joi.boolean().optional(),
  },
})

const validateFetchSubcategorySchema = celebrate({
  [Segments.PARAMS]: paramsBaseSchema,
})

const validateEditSubcategorySchema = celebrate({
  [Segments.PARAMS]: paramsBaseSchema,
  [Segments.BODY]: {
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    type: Joi.string().optional(),
  },
})

const validateRemoveSubcategorySchema = celebrate({
  [Segments.PARAMS]: paramsBaseSchema,
})

const validateUniqueSubcategory = async (request, _response, next) => {
  const {
    body: { name },
  } = request

  if (isDefined(name)) {
    const subcategory = await findSubcategoryByName(name)

    if (isDefined(subcategory)) {
      throw new AppError(HttpStatus[409].statusCode, HttpStatus[409].message)
    }
  }

  next()
}

const validateSubcategoryExistence = async (request, _response, next) => {
  const { query, params, body } = request

  const subcategoryID =
    params.subcategoryID || query.subcategoryID || body.subcategoryID

  const subcategory = await findSubcategoryByID(subcategoryID)

  if (isNullOrUndefined(subcategory)) {
    throw new AppError(HttpStatus[404].statusCode, HttpStatus[404].message)
  }

  request.locals.subcategory = subcategory

  next()
}

const validateSubcategoriesExistence = async (request, _response, next) => {
  const { body } = request

  const subcategoryIDs = body.subcategories.map(subcategory => subcategory.id)

  const subcategoriesFound = await findSubcategoriesByIDs(subcategoryIDs)

  if (subcategoriesFound.length !== subcategoryIDs.length) {
    throw new AppError(HttpStatus[404].statusCode, HttpStatus[404].message)
  }

  next()
}

export {
  validateCreateSubcategorySchema,
  validateFetchSubcategoriesSchema,
  validateFetchSubcategorySchema,
  validateEditSubcategorySchema,
  validateRemoveSubcategorySchema,
  validateUniqueSubcategory,
  validateSubcategoryExistence,
  validateSubcategoriesExistence,
}
