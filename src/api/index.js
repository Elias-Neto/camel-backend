import { Router } from 'express'

import examplesRouter from './examples/examples.router.js'
import usersRouter from './users/users.router.js'
import sessionsRouter from './sessions/sessions.router.js'
import categoryRouter from './category/category.router.js'

const router = Router()

router.use('/examples', examplesRouter)
router.use('/users', usersRouter)
router.use('/sessions', sessionsRouter)
router.use('/categories', categoryRouter)

export default router
