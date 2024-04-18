import { insertOrder } from './orders.dao.js'

import AppError from '../../utils/AppError.js'

import HttpStatus from '../../types/global.enums.js'

import { mapOrder } from './orders.helper.js'

import { sendEmail } from '../../service/email.service.js'
import { findUserByID } from '../users/users.dao.js'
import { emailCreator } from '../../helpers/emailCreator.js'

const fetchOrder = async (request, response) => {
  const { locals } = request

  try {
    response.status(200).json(locals)
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

const createOrder = async (request, response) => {
  const { body } = request

  try {
    const orderMapped = mapOrder(body)
    const order = await insertOrder(orderMapped)

    const to = await findUserByID(body.userID).then(
      response => response.dataValues.email,
    )
    const subject = `Confirmação do orçamento ${order.id}`
    sendEmail(to, subject, emailCreator(order.products))

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

export { createOrder, fetchOrder }
