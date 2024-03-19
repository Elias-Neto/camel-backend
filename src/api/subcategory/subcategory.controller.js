import {
  insertSubcategory,
  updateSubcategory,
  deleteSubcategory,
  findSubcategoryByID,
  findSubcategoryByName,
  findAllSubcategory
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

const fetchSubcategories = async (request, response) => {
  try {
    const data = await findAllSubcategory()

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
  const { body } = request
  try {
    const subcategory = findSubcategoryByID(body.subcategory_id)

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
    var subcategory = await findSubcategoryByID(subcategoryID)

    if (!subcategory) {
      throw new AppError(HttpStatus[404].statusCode, HttpStatus[404].message)
    }

    await updateSubcategory(subcategoryID, body)

    subcategory = await findSubcategoryByID(subcategoryID)
    response.status(200).json(subcategory)
  } catch (error) {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      })
    }
    return response.status(HttpStatus[500].statusCode).json({
      message: error,
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
