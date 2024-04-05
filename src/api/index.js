import { Router } from 'express'

import usersRouter from './users/users.router.js'
import examplesRouter from './examples/examples.router.js'
import sessionsRouter from './sessions/sessions.router.js'
import categoriesRouter from './categories/categories.router.js'
import productsRouter from './products/products.router.js'
import ordersRouter from './orders/orders.router.js'
import imagesRouter from './images/images.router.js'

const router = Router()

router.use('/users', usersRouter)
router.use('/orders', ordersRouter)
router.use('/images', imagesRouter)
router.use('/examples', examplesRouter)
router.use('/sessions', sessionsRouter)
router.use('/categories', categoriesRouter)
router.use('/products', productsRouter)

export default router
