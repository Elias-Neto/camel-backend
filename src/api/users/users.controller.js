import bcrypt from 'bcryptjs'
const { hash } = bcrypt

import {
  insertUser,
  updateUser,
  findAllUsers,
  deleteUser,
} from './users.dao.js'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'

import { api as n8nWebHook } from '../../service/n8n.js'

const createUser = async (request, response) => {
  const { body } = request

  try {
    const checkPassword = body.password === body.confirmedPassword

    if (!checkPassword) {
      throw new AppError(
        HttpStatus[400].statusCode,
        'As senhas devem ser iguais.',
      )
    }

    const passwordHash = await hash(body.password, 8)

    const user = await insertUser({ ...body, password: passwordHash })

    await n8nWebHook.post('/', { name: user.name, email: user.email })

    return response.status(201).json()
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

const fetchUsers = async (request, response) => {
  try {
    const data = await findAllUsers()

    response.status(200).json(data)
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

const removeUser = async (request, response) => {
  const { params } = request

  try {
    const { userID } = params

    await deleteUser(userID)

    response.status(204).end()
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

const editUser = async (request, response) => {
  const { params, body } = request

  try {
    const { userID } = params

    const user = await updateUser(userID, body)

    response.status(200).json(user)
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

export { createUser, fetchUsers, removeUser, editUser }
