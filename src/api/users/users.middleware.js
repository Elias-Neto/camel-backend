import { celebrate, Joi, Segments } from 'celebrate'

import { findUserByEmail } from './users.dao.js'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'
import { isDefined } from '../../helpers/object-helper.js'

const validateCreateUserSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    cpf: Joi.string().required(),
    phone: Joi.string().required(),
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
