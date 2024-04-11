import imagesProductsModel from './images-products.model'

const findImageByProductID = async productID => {
  const images = await imagesProductsModel.findAll({
    where: {
      product_id: productID,
      deletedAt: null,
    },
  })

  return images.map(image => image.dataValues)
}

export { findImageByProductID }
