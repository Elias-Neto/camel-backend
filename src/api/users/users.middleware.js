import { celebrate, Joi, Segments } from 'celebrate'

import { findUserByEmail } from './users.dao.js'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'
import { isDefined } from '../../helpers/object-helper.js'

const validateCreateUserSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$'))
      .message(
        'A senha deve ter no mínimo 6 caracteres e conter letras e números.',
      ),
    confirmedPassword: Joi.string().required(),
  },
})

const validateUniqueUser = async (request, _response, next) => {
  const {
    body: { email },
  } = request

  const users = await findUserByEmail(email)

  if (isDefined(users)) {
    throw new AppError(HttpStatus[409].statusCode, HttpStatus[409].message)
  }
  next()
}

export { validateCreateUserSchema, validateUniqueUser }
