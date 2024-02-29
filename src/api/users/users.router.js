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
  validateEditUserSchema,
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
  validateEditUserSchema,
  validateUserExistence,
  validateUniqueUserPUT,
  editUser,
])

export default router
