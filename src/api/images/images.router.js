import { Router } from 'express'

import { createImage } from './images.controller.js'
import {
  validateCreateImageSchema,
  validateExistence,
} from './images.middleware.js'

const router = Router()
router.post('/', [validateCreateImageSchema, validateExistence, createImage])

export default router
