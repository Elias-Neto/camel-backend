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
  validateupdateUserSchema,
} from './users.middleware.js'

const router = Router()

router.post('/', [validateCreateUserSchema, validateUniqueUser, createUser])

router.get('/', [fetchUsers])

router.delete('/:userID', [
  validateRemoveUser,
  validateUserExistence,
  removeUser,
])

router.put('/:userID', [validateupdateUserSchema, validateUniqueUser, editUser])

export default router
