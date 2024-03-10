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

const fetchCategories = async (request, response) => {

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

const fetchCategory = async (request, response) => {
  const { locals } = request

  try {
    const { category } = locals

    response.status(200).json(category)
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

const editCategory = async (request, response) => {
  const { params, body } = request

  try {
    const { categoryID } = params

    const category = await updateCategory(categoryID, body)

    response.status(200).json(category)
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

const removeCategory = async (request, response) => {
  const { params } = request

  try {
    const { categoryID } = params

    await deleteCategory(categoryID)

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
  createCategory,
  fetchCategories,
  fetchCategory,
  editCategory,
  removeCategory,
}
