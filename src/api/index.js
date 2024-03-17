import { Router } from 'express'

import usersRouter from './users/users.router.js'
import examplesRouter from './examples/examples.router.js'
import sessionsRouter from './sessions/sessions.router.js'
import categoryRouter from './category/category.router.js'
import productsRouter from './products/products.router.js'

const router = Router()

router.use('/users', usersRouter)
router.use('/examples', examplesRouter)
router.use('/sessions', sessionsRouter)
router.use('/categories', categoryRouter)
router.use('/products', productsRouter)

export default router
