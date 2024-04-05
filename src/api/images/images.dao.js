import imagesModel from './images.model.js'

const insertImage = async data => {
  return await imagesModel.create(data)
}

const fetchImageByRelatedId = async RelatedId => {
  const images = await imagesModel.findAll({
    where: {
      related_id: RelatedId,
      deletedAt: null,
    },
  })

  return images.map(image => image.dataValues)
}

const deleteImageByRelatedId = async RelatedId => {
  return await imagesModel.destroy({
    where: {
      related_id: RelatedId,
      deletedAt: null,
    },
  })
}

export { deleteImageByRelatedId, fetchImageByRelatedId, insertImage }
