import 'express-async-errors'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

import './config/dotenv.js'
import './config/db.js'

import routes from './api/index.js'
import exceptionHandler from './middlewares/errors-handlers.js'

import swaggerDocument from './docs/swagger.js'

const app = express()

// Use Cors
app.use(
  cors({
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Api-Key'],
    exposedHeaders: ['x-count'],
  }),
)

// Use Morgan
app.use(morgan('dev'))

// Use Body Parser JSON Middleware
app.use(express.json())

// Initiate Request Locals Object
app.use((request, _response, next) => {
  Object.assign(request, { locals: {} })

  next()
})

// Serve Swagger UI
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Routes
app.use(routes)

// Use Error Handler
app.use(exceptionHandler)

export default app
