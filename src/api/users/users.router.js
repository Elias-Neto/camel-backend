import { Router } from 'express'

import { createUser } from './users.controller.js'

import {
  validateCreateUserSchema,
  validateUniqueUser,
} from './users.middleware.js'

const router = Router()

router.post('/', [validateCreateUserSchema, validateUniqueUser, createUser])

export default router
