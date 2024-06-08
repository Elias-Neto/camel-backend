import { recommendations } from './recommendations.js'

const getRecommendProductIDs = (productID, type) => {
  let filteredRecommendations = []
  let productIDs = []

  if (type === 'bought-together') {
    filteredRecommendations = recommendations.filter(rec =>
      rec.consequents.includes(productID),
    )
    productIDs = filteredRecommendations.flatMap(rec =>
      rec.antecedents.filter(ant => ant !== productID),
    )
  }

  if (type === 'related') {
    filteredRecommendations = recommendations.filter(rec =>
      rec.antecedents.includes(productID),
    )
    productIDs = filteredRecommendations.flatMap(rec => rec.consequents)
  }

  const uniqueProductIDs = [...new Set(productIDs)]

  return uniqueProductIDs
}

export { getRecommendProductIDs }
