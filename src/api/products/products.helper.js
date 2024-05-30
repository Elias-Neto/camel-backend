import { recommendations } from './recommendations.js'

const getRecommendProductIDs = productID => {
  const filteredRecommendations = recommendations.filter(rec =>
    rec.antecedents.includes(productID),
  )

  const productIDs = filteredRecommendations.flatMap(rec => rec.consequents)

  const uniqueProductIDs = [...new Set(productIDs)]

  return uniqueProductIDs
}

export { getRecommendProductIDs }
