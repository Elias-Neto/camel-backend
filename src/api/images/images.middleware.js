import { celebrate, Joi, Segments } from 'celebrate'
import imageTypes from './image.type.js'

const validateCreateImageSchema = celebrate({
  [Segments.BODY]: {
    src: Joi.string().required(),
    related_id: Joi.string().uuid().required(),
    id_type: Joi.string()
      .valid(...Object.values(imageTypes))
      .required(),
  },
})

export { validateCreateImageSchema }
