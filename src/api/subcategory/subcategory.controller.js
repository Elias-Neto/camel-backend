import {
  insertSubcategory,
  findAndCountSubcategories,
  updateSubcategory,
  deleteSubcategory,
} from './subcategory.dao.js'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'

const createSubcategory = async (request, response) => {
  const { body } = request

  try {
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

const fetchSubcategories = async (request, response) => {
  const { query } = request

  try {
    const { data, count } = await findAndCountSubcategories(query)

    response.set('x-count', count)

    response.status(200).json(data)
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
  const { locals } = request

  try {
    const { subcategory } = locals

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
    const { subcategoryID } = params

    const subcategory = await updateSubcategory(subcategoryID, body)

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

const removeSubcategory = async (request, response) => {
  const { params } = request

  try {
    const { subcategoryID } = params

    await deleteSubcategory(subcategoryID)

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
