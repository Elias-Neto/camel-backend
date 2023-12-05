import bcrypt from 'bcryptjs'
const { hash } = bcrypt

import { insertUser } from './users.dao.js'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'

const createUser = async (request, response) => {
  const { body } = request

  try {
    const user = await insertUser(body)

    const passwordHash = await hash(body.password, 8)

    const user = await insertUser({ ...body, password: passwordHash })

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

export { createUser }
