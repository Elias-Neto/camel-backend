import ordersModel from './orders.model.js'

const insertOrder = async data => {
  return await ordersModel.create(data)
}

export { insertOrder }
