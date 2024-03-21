import { Sequelize } from 'sequelize'

import productsModel from './products.model.js'

import { isDefined } from '../../helpers/object-helper.js'
import { searchAttributeString } from '../../helpers/query-helper.js'

const insertProduct = async data => {
  return await productsModel.create(data)
}

const findAndCountProducts = async params => {
  const { limit, offset, sortBy, sortOrder, search, name, price, available } =
    params

  const options = {
    where: {
      deletedAt: null,
      ...(isDefined(search) && {
        [Sequelize.Op.or]: [
          {
            name: {
              [Sequelize.Op.iLike]: `%${searchAttributeString(search)}%`,
            },
          },
          {
            description: {
              [Sequelize.Op.iLike]: `%${searchAttributeString(search)}%`,
            },
          },
        ],
      }),
      ...(isDefined(name) && { name: searchAttributeString(name) }),
      ...(isDefined(price) && { price: searchAttributeString(price) }),
      ...(isDefined(available) && { available }),
    },
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [[sortBy, sortOrder]],
  }

  const result = await productsModel.findAndCountAll(options)

  return {
    count: result.count,
    data: result.rows,
  }
}

const findProductByName = async name => {
  return await productsModel.findOne({
    where: {
      name,
      deletedAt: null,
    },
  })
}

const findProductByID = async productID => {
  return await productsModel.findOne({
    where: {
      id: productID,
      deletedAt: null,
    },
  })
}

const findProductsByIDs = async productIDs => {
  return await productsModel.findAll({
    where: {
      id: { [Sequelize.Op.in]: productIDs },
      deletedAt: null,
    },
  })
}

const updateProduct = async (productID, data) => {
  await productsModel.update(data, {
    where: {
      id: productID,
      deletedAt: null,
    },
  })

  return await findProductByID(productID)
}

const deleteProduct = async productID => {
  return await productsModel.destroy({
    where: {
      id: productID,
      deletedAt: null,
    },
  })
}

// TODO: findProductByPrice

export {
  insertProduct,
  findAndCountProducts,
  findProductByName,
  findProductByID,
  findProductsByIDs,
  updateProduct,
  deleteProduct,
}
