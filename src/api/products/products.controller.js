import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'

import {
  insertProduct,
  findAndCountProducts,
  updateProduct,
  deleteProduct,
} from './products.dao.js'

import { findImageByProductID } from '../images/products/images-products.dao.js'

const createProduct = async (request, response) => {
  const { body } = request

  try {
    const user = await insertProduct(body)

    return response.status(201).json(user)
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

const fetchProducts = async (request, response) => {
  const { query } = request

  try {
    let { data: products, count } = await findAndCountProducts(query)

    const productsWithImage = await Promise.all(
      products.map(async product => {
        const images = await findImageByProductID(product.id)
        product.dataValues.images = images
        return product
      }),
    )

    response.set('x-count', count)

    response.status(200).json(productsWithImage)
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

const fetchProduct = async (request, response) => {
  const { locals } = request

  try {
    const { product } = locals
    const images = await findImageByProductID(product.id)

    product.dataValues.images = images

    response.status(200).json(product)
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

const editProduct = async (request, response) => {
  const { params, body } = request

  try {
    const { productID } = params

    const example = await updateProduct(productID, body)

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

const removeProduct = async (request, response) => {
  const { params } = request

  try {
    const { productID } = params

    await deleteProduct(productID)

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
  createProduct,
  fetchProducts,
  fetchProduct,
  editProduct,
  removeProduct,
}
