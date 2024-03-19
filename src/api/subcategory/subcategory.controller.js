import {
  insertSubcategory,
  updateSubcategory,
  findSubcategory,
  deleteSubcategory,
} from './subcategory.dao.js'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'

const createSubcategory = async (request, response) => {
  const { body } = request

  try {
    //Transformar em UpperCase
    Object.keys(body).forEach( (key, index) => {
      body[key] = body[key].toUpperCase()
    })
    const subcategory = await insertSubcategory(body)

    return response.status(201).json(subcategory)
  } catch (error) {
    if (error instanceof AppError) {
      throw response.status(error.statusCode).json({
        message: error.message,
      })
    }

    throw response.status(HttpStatus[500].statusCode).json({
      message: HttpStatus[500].message,
    })
  }
}

const fetchSubcategory = async (request, response) => {

  const { body } = request.body

  try {
    const subcategory = await findSubcategory(body) 

    response.status(200).json(subcategory)
  } catch (error) {
    if (error instanceof AppError) {
      throw response.status(error.statusCode).json({
        message: error.message,
      })
    }

    throw response.status(HttpStatus[500].statusCode).json({
      message: HttpStatus[500].message,
    })
  }
}

const editSubcategory = async (request, response) => {
  const { params, body } = request

  try {
    const { exampleID } = params

    const example = await updateExample(exampleID, body)

    response.status(200).json(example)
  } catch (error) {
    if (error instanceof AppError) {
      throw response.status(error.statusCode).json({
        message: error.message,
      })
    }
    throw response.status(HttpStatus[500].statusCode).json({
      message: HttpStatus[500].message,
    })
  }
}

const removeExample = async (request, response) => {
  const { params } = request

  try {
    const { exampleID } = params

    await deleteExample(exampleID)

    response.status(204).end()
  } catch (error) {
    if (error instanceof AppError) {
      throw response.status(error.statusCode).json({
        message: error.message,
      })
    }

    throw response.status(HttpStatus[500].statusCode).json({
      message: HttpStatus[500].message,
    })
  }
}

export {
  createSubcategory,
  fetchSubcategories,
  fetchSubcategory,
  editSubcategory,
  removeSubcategory,
}
