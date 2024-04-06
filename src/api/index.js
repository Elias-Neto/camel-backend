import { Router } from 'express'

import usersRouter from './users/users.router.js'
import examplesRouter from './examples/examples.router.js'
import sessionsRouter from './sessions/sessions.router.js'
import categoriesRouter from './categories/categories.router.js'
import productsRouter from './products/products.router.js'
import ordersRouter from './orders/orders.router.js'
import subcategoriesRouter from './subcategory/subcategory.router.js'

const router = Router()

router.use('/users', usersRouter)
router.use('/orders', ordersRouter)
router.use('/examples', examplesRouter)
router.use('/sessions', sessionsRouter)
router.use('/categories', categoriesRouter)
router.use('/products', productsRouter)
router.use('/subcategories', subcategoriesRouter)

export default router
