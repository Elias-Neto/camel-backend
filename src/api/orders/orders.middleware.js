import { celebrate, Joi, Segments } from 'celebrate'

const validateCreateOrderSchema = celebrate({
  [Segments.BODY]: {
    total: Joi.string().required(),
    userID: Joi.string().required(),
    products: Joi.array().items({
      id: Joi.string().required(),
      quantity: Joi.number().required(),
    }),
  },
})

export { validateCreateOrderSchema }
