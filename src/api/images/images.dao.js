import imagesModel from './images.model.js'

const insertImage = async data => {
  return await imagesModel.create(data)
}

const fetchImageByRelatedId = async (id, type) => {
  const idType =
    type == 'PRODUCT' ? 'product_id' : type == 'CATEGORY' ? 'category_id' : ''

  const images = await imagesModel.findAll({
    where: {
      [idType]: id,
      deletedAt: null,
    },
  })

  return images.map(image => image.dataValues)
}

const deleteImageByRelatedId = async (id, type) => {
  const idType =
    type == 'PRODUCT' ? 'product_id' : type == 'CATEGORY' ? 'category_id' : ''

  return await imagesModel.destroy({
    where: {
      [idType]: id,
      deletedAt: null,
    },
  })
}

export { deleteImageByRelatedId, fetchImageByRelatedId, insertImage }
