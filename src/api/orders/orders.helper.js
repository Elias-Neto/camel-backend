const mapOrder = order => ({
  id: order.id,
  user_id: order.userID,
  ...order,
})

const mapRelatedProducts = (relatedProducts, productsRelationships) => {
  const mapRelatedProducts = relatedProducts.map(product => {
    const { quantity } = productsRelationships.find(
      relationship => relationship.product_id === product.id,
    )

    return {
      ...product.dataValues,
      quantity,
    }
  })

  return mapRelatedProducts
}

export { mapOrder, mapRelatedProducts }
