import { insertOrder } from './orders.dao.js'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'

const createOrder = async (request, response) => {
  const { body } = request

  try {
    const user = await insertOrder(body)

    return response.status(201).json(user)
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
