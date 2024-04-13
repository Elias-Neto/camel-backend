import { celebrate, Joi, Segments } from 'celebrate'
import { findOrderByID } from './orders.dao.js'
import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'
import { isNullOrUndefined } from '../../helpers/object-helper.js'

const paramsBaseSchema = {
  orderID: Joi.string().uuid().required(),
}

const validateFetchOrdersSchema = celebrate({
  [Segments.PARAMS]: paramsBaseSchema,
})

const validateCreateOrderSchema = celebrate({
  [Segments.BODY]: {
    total: Joi.string().required(),
    userID: Joi.string().required(),
    products: Joi.array().items({
      id: Joi.string().required(),
      quantity: Joi.number().required(),
    }),
  },
})

const validateOrdersExistence = async (request, _response, next) => {
  const { query, params, body } = request

  const orderID = params.orderID || query.orderID || body.orderID

  const order = await findOrderByID(orderID)

  if (isNullOrUndefined(order)) {
    throw new AppError(HttpStatus[404].statusCode, HttpStatus[404].message)
  }

  request.locals = order

  next()
}

export {
  validateCreateOrderSchema,
  validateOrdersExistence,
  validateFetchOrdersSchema,
}
