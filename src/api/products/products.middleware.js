import { celebrate, Joi, Segments } from 'celebrate'

import {
  findProductByName,
  findProductByID,
  findProductsByIDs,
} from './products.dao.js'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'
import { paginationBaseSchema } from '../../helpers/validations-helper.js'
import { isDefined, isNullOrUndefined } from '../../helpers/object-helper.js'

const paramsBaseSchema = {
  productID: Joi.string().uuid().required(),
}

const validateCreateProductSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().required(),
    available: Joi.boolean().optional(),
    subcategoryID: Joi.string().uuid().optional(),
  },
})

const validateFetchProductsSchema = celebrate({
  [Segments.QUERY]: {
    ...paginationBaseSchema,
    name: Joi.string().optional(),
    price: Joi.string().optional(),
    available: Joi.boolean().optional(),
    subcategoryID: Joi.string().uuid().optional(),
  },
})

const validateFetchProductSchema = celebrate({
  [Segments.PARAMS]: paramsBaseSchema,
})

const validateEditProductSchema = celebrate({
  [Segments.PARAMS]: paramsBaseSchema,
  [Segments.BODY]: {
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.string().optional(),
    available: Joi.boolean().optional(),
  },
})

const validateRemoveProductSchema = celebrate({
  [Segments.PARAMS]: paramsBaseSchema,
})

const validateUniqueProduct = async (request, _response, next) => {
  const {
    body: { name },
  } = request

  if (isDefined(name)) {
    const product = await findProductByName(name)

    if (isDefined(product)) {
      throw new AppError(HttpStatus[409].statusCode, HttpStatus[409].message)
    }
  }

  next()
}

const validateProductExistence = async (request, _response, next) => {
  const { query, params, body } = request

  const productID = params.productID || query.productID || body.productID

  const product = await findProductByID(productID)

  if (isNullOrUndefined(product)) {
    throw new AppError(HttpStatus[404].statusCode, HttpStatus[404].message)
  }

  request.locals.product = product

  next()
}

const validateProductsExistence = async (request, _response, next) => {
  const { body } = request

  const productIDs = body.products.map(product => product.id)

  const productsFound = await findProductsByIDs(productIDs)

  if (productsFound.length !== productIDs.length) {
    throw new AppError(HttpStatus[404].statusCode, HttpStatus[404].message)
  }

  next()
}

export {
  validateCreateProductSchema,
  validateFetchProductsSchema,
  validateFetchProductSchema,
  validateEditProductSchema,
  validateRemoveProductSchema,
  validateUniqueProduct,
  validateProductExistence,
  validateProductsExistence,
}
