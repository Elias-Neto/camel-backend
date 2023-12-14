import { Router } from 'express'

import { createUser, fetchUsers, removeUser } from './users.controller.js'

import {
  validateCreateUserSchema,
  validateUniqueUser,
  validateUserExistence,
  validateRemoveUser,
} from './users.middleware.js'

const router = Router()

router.post('/', [validateCreateUserSchema, validateUniqueUser, createUser])

router.get('/', [fetchUsers])

router.delete('/:userID', [
  validateRemoveUser,
  validateUserExistence,
  removeUser,
])

export default router
