import usersModel from './users.model.js'

const insertUser = async userData => {
  return await usersModel.create(userData)
}

const findUserByEmail = async email => {
  return await usersModel.findOne({
    where: {
      email,
      deletedAt: null,
    },
  })
}

export { insertUser, findUserByEmail }
