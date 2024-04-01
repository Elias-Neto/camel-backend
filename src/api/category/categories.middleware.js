import { celebrate, Joi, Segments } from 'celebrate'

import { findCategoryByID, findCategoryByName } from './categories.dao.js'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'
import { paginationBaseSchema } from '../../helpers/validations-helper.js'
import { isDefined, isNullOrUndefined } from '../../helpers/object-helper.js'

const paramsBaseSchema = {
  categoryID: Joi.string().uuid().required(),
}

const validateFetchCategoriesSchema = celebrate({
  [Segments.QUERY]: {
    ...paginationBaseSchema,
    name: Joi.string(),
  },
})

const validateFetchCategorySchema = celebrate({
  [Segments.PARAMS]: paramsBaseSchema,
})

const validateCreateCategorySchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string(),
    type: Joi.string(),
  },
})

const validateUpdateCategorySchema = celebrate({
  [Segments.PARAMS]: paramsBaseSchema,
  [Segments.BODY]: {
    name: Joi.string(),
    description: Joi.string(),
    type: Joi.string(),
  },
})

const validateRemoveCategorySchema = celebrate({
  [Segments.PARAMS]: paramsBaseSchema,
})

const validateUniqueCategory = async (request, _response, next) => {
  const {
    body: { name },
  } = request

  const category = await findCategoryByName(name)

  if (isDefined(category)) {
    throw new AppError(HttpStatus[409].statusCode, 'Categoria já cadastrada.')
  }

  next()
}

const validateUniqueCategoryPUT = async (request, _response, next) => {
  const {
    body: { name },
    params: { categoryID },
  } = request
  const categoryByID = await findCategoryByID(categoryID)
  const checkNameEquality = categoryByID.name === name

  if (!checkNameEquality) {
    const category = await findCategoryByName(name)

    if (isDefined(category)) {
      throw new AppError(HttpStatus[409].statusCode, 'Categoria já cadastrada.')
    }
  }

  next()
}

const validateCategoryExistence = async (request, _response, next) => {
  const { query, params, body } = request

  const categoryID = params.categoryID || query.categoryID || body.categoryID

  const category = await findCategoryByID(categoryID)

  if (isNullOrUndefined(category)) {
    throw new AppError(HttpStatus[404].statusCode, HttpStatus[404].message)
  }

  request.locals.category = category

  next()
}

export {
  validateCreateCategorySchema,
  validateUniqueCategory,
  validateCategoryExistence,
  validateRemoveCategorySchema,
  validateUpdateCategorySchema,
  validateUniqueCategoryPUT,
  validateFetchCategoriesSchema,
  validateFetchCategorySchema,
}
