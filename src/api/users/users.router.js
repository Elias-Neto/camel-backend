import { Router } from 'express'

import {
  createUser,
  fetchUsers,
  removeUser,
  editUser,
} from './users.controller.js'

import {
  validateCreateUserSchema,
  validateUniqueUser,
  validateUserExistence,
  validateRemoveUser,
  validateUpdateUserSchema,
  validateUniqueUserPUT,
} from './users.middleware.js'

const router = Router()

router.post('/', [validateCreateUserSchema, validateUniqueUser, createUser])

router.get('/', [fetchUsers])

router.delete('/:userID', [
  validateRemoveUser,
  validateUserExistence,
  removeUser,
])

router.put('/:userID', [
  validateUpdateUserSchema,
  validateUserExistence,
  validateUniqueUserPUT,
  editUser,
])

export default router
