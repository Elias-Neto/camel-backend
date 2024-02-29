import {
  insertCategory,
  updateCategory,
  deleteCategory,
  findCategoryByID,
  findCategoryByName
} from './category.dao.js.dao.js'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'

const createCategory = async (request, response) => {
  const { body } = request

  try {
    //Transformar em UpperCase
    Object.keys(body).forEach( (key, index) => {
      body[key] = body[key].toUpperCase()
    })

    const category = await insertCategory(body)

    return response.status(201).json(category)
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

const fetchCategory = async (request, response) => {

  try {
    if (request.category_name === null || undefined) { 
      const category = await findCategoryByID(request.category_id)
      response.status(200).json(category)
    }else if (request.category_id === null || undefined) {
      const category = await findCategoryByName(request.category_name)
      response.status(200).json(category)
    }
    
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

//Terminar de Construir
const editCategory = async (request, response) => {
  const { params, body } = request

  try {
    const { categoryID } = params

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
  createExample,
  fetchExamples,
  fetchExample,
  editExample,
  removeExample,
}
