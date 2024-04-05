import { Router } from 'express'

import { createImage } from './images.controller.js'
import { validateCreateImageSchema } from './images.middleware.js'
import { validateProductExistence } from '../products/products.middleware.js'

const router = Router()

router.post('/', [
  validateCreateImageSchema,
  validateProductExistence,
  createImage,
])

export default router
