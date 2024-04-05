import { celebrate, Joi, Segments } from 'celebrate'

import { validateProductExistence } from '../products/products.middleware.js'
import { validateCategoryExistence } from '../categories/categories.middleware.js'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'

const validateCreateImageSchema = celebrate({
  [Segments.BODY]: {
    src: Joi.string().required(),
    product_id: Joi.string().uuid(),
    category_id: Joi.string().uuid(),
  },
})

const validateExistence = async (request, response, next) => {
  const { body } = request
  if (body.product_id) {
    // Se existir, chame o middleware "validateProductExistence"
    return validateProductExistence(request, response, next)
  } else if (body.category_id) {
    // Se existir, chame o middleware "validateCategoryExistence"
    return validateCategoryExistence(request, response, next)
  } else {
    throw new AppError(HttpStatus[400].statusCode, HttpStatus[400].message)
  }
}

export { validateCreateImageSchema, validateExistence }
