import { Router } from 'express'

import { createUser, fetchUsers } from './users.controller.js'

import {
  validateCreateUserSchema,
  validateUniqueUser,
} from './users.middleware.js'

const router = Router()

router.post('/', [validateCreateUserSchema, validateUniqueUser, createUser])

router.get('/', [fetchUsers])

export default router
