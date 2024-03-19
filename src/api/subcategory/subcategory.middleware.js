import { celebrate, Joi, Segments } from 'celebrate'

import { findSubcategoryByID, findSubcategoryByName } from './subcategory.dao.js'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'
import { isDefined, isNullOrUndefined } from '../../helpers/object-helper.js'

const paramsBaseSchema = {
  subcategoryID: Joi.number().required(),
}

const validateCreateSubcategorySchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string(),
    type: Joi.string(),
    categoryId: Joi.number().required(),
  },
})

const validateUpdateSubcategorySchema = celebrate({
  [Segments.PARAMS]: paramsBaseSchema,
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string(),
    type: Joi.string(),
    categoryId: Joi.number().required(),
  },
})

const validateRemoveSubcategory = celebrate({
  [Segments.PARAMS]: paramsBaseSchema,
})

const validateUniqueSubcategory = async (request, _response, next) => {
  const {
    body: { name },
  } = request

  const category = await findSubcategoryByName(name)

  if (isDefined(category)) {
    throw new AppError(HttpStatus[409].statusCode, 'Subcategoria já cadastrada.')
  }

  next()
}

const validateUniqueSubcategoryPUT = async (request, _response, next) => {
  const {
    body: { name },
    params: { subcategoryID },
  } = request
  const subcategoryByID = await findSubcategoryByID(subcategoryID)
  const checkNameEquality = subcategoryByID.name === name

  if (!checkNameEquality) {
    const subcategory = await findSubcategoryByName(name)

    if (isDefined(subcategory)) {
      throw new AppError(HttpStatus[409].statusCode, 'Subcategoria já cadastrada.')
    }
  }

  next()
}

const validateSubcategoryExistence = async (request, _response, next) => {
  const { query, params, body } = request

  const subcategoryID = params.subcategoryID || query.subcategoryID || body.subcategoryID
  const subcategory = await findSubcategoryByID(subcategoryID)
  if (isNullOrUndefined(subcategory)) {
    throw new AppError(HttpStatus[404].statusCode, HttpStatus[404].message)
  }

  request.locals.subcategory = subcategory

  next()
}

export {
  validateCreateSubcategorySchema,
  validateUniqueSubcategory,
  validateSubcategoryExistence,
  validateRemoveSubcategory,
  validateUpdateSubcategorySchema,
  validateUniqueSubcategoryPUT,
}
