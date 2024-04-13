import Sequelize from 'sequelize'

import ordersModel from './orders.model.js'
import productsModel from '../products/products.model.js'
import orderProductModel from '../order-product/order-product.model.js'

import { mapRelatedProducts } from './orders.helper.js'

const findOrderByID = async orderID => {
  const order = await ordersModel.findOne({
    where: {
      id: orderID,
      deletedAt: null,
    },
  })

  const productsRelationships = await orderProductModel.findAll({
    where: {
      order_id: orderID,
      deletedAt: null,
    },
  })

  const relatedProducts = await productsModel.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: productsRelationships.map(
          product => product.product_id,
        ),
      },
      deletedAt: null,
    },
  })

  const mappedRelatedProducts = mapRelatedProducts(
    relatedProducts,
    productsRelationships,
  )

  return { ...order.dataValues, products: mappedRelatedProducts }
}

const insertOrder = async data => {
  const createdOrder = await ordersModel.create(data)

  const createProductRelationships = data.products.map(async product => {
    await orderProductModel.create({
      order_id: createdOrder.id,
      product_id: product.id,
      quantity: product.quantity,
    })
  })

  await Promise.all(createProductRelationships)

  return await findOrderByID(createdOrder.id)
}

export { insertOrder, findOrderByID }
