import imagesCategoryModel from './images-categories.model.js'

const findImageByCategoryID = async categoryID => {
  const images = await imagesCategoryModel.findAll({
    where: {
      category_id: categoryID,
      deletedAt: null,
    },
  })

  return images.map(image => image.dataValues)
}

export { findImageByCategoryID }
