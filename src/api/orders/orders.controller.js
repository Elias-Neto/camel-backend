import { insertOrder } from './orders.dao.js'

import AppError from '../../utils/AppError.js'

import HttpStatus from '../../types/global.enums.js'

import { mapOrder } from './orders.helper.js'

const createOrder = async (request, response) => {
  const { body } = request

  try {
    const orderMapped = mapOrder(body)

    const order = await insertOrder(orderMapped)

    return response.status(201).json(order)
  } catch (error) {
    if (error instanceof AppError) {
      throw response.status(error.statusCode).json({
        message: error.message,
      })
    }

    throw response.status(HttpStatus[500].statusCode).json({
      message: HttpStatus[500].message,
    })
  }
}

export { createOrder }
