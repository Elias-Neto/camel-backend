import {
  insertCategory,
  updateCategory,
  deleteCategory,
  findAndCountCategories,
  findCategoryByID,
} from './categories.dao.js'

import {
  deleteImageByRelatedId,
  fetchImageByRelatedId,
} from '../images/images.dao.js'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'
import imageTypes from '../images/image.type.js'

const createCategory = async (request, response) => {
  const { body } = request

  try {
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
  const { query } = request

  try {
    let { data, count } = await findAndCountCategories(query)

    data = await Promise.all(
      data.map(async category => {
        const images = await fetchImageByRelatedId(
          category.id,
          imageTypes.CATEGORY,
        )
        category.dataValues.images = images
        return category
      }),
    )

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

const fetchCategory = async (request, response) => {
  const { locals } = request

  try {
    const { category } = locals
    const images = await fetchImageByRelatedId(category.id, imageTypes.CATEGORY)

    category.dataValues.images = images

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

    var category = await findCategoryByID(categoryID)

    if (!category) {
      throw new AppError(HttpStatus[404].statusCode, HttpStatus[404].message)
    }

    await updateCategory(categoryID, body)

    category = await findCategoryByID(categoryID)
    response.status(200).json(category)
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

const removeCategory = async (request, response) => {
  const { params } = request
  try {
    const { categoryID } = params

    await deleteImageByRelatedId(categoryID, imageTypes.CATEGORY)
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
