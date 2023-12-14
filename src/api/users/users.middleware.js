import { celebrate, Joi, Segments } from 'celebrate'

import { findUserByEmail, findUserByID } from './users.dao.js'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'
import { isDefined, isNullOrUndefined } from '../../helpers/object-helper.js'

const paramsBaseSchema = {
  userID: Joi.string().required(),
}

const validateCreateUserSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      .pattern(new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/))
      .message(
        'A senha deve ter mais de 6 caracteres e conter letras e números.',
      ),
    confirmedPassword: Joi.string().required(),
  },
})

const validateRemoveUser = celebrate({
  [Segments.PARAMS]: paramsBaseSchema,
})

const validateUniqueUser = async (request, _response, next) => {
  const {
    body: { email },
  } = request

  const users = await findUserByEmail(email)

  if (isDefined(users)) {
    throw new AppError(HttpStatus[409].statusCode, 'Email já cadastrado.')
  }
  next()
}

const validateUserExistence = async (request, _response, next) => {
  const { query, params, body } = request

  const userID = params.userID || query.userID || body.userID

  const user = await findUserByID(userID)

  if (isNullOrUndefined(user)) {
    throw new AppError(HttpStatus[404].statusCode, HttpStatus[404].message)
  }

  request.locals.user = user

  next()
}

export {
  validateCreateUserSchema,
  validateUniqueUser,
  validateUserExistence,
  validateRemoveUser,
}
