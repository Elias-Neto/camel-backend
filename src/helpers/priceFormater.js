const priceFormatter = (price, currency) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
  }).format(price)

  return formattedPrice
}

export { priceFormatter }
