import { priceFormatter } from './priceFormater.js'

export const emailCreator = produtos => {
  let valorTotal = 0 // Inicialize o valor total como 0

  let emailBody = `
    Olá,

    Você realizou um orçamento conosco. Abaixo estão os detalhes dele:
  `

  produtos.forEach((produto, index) => {
    const valorProduto = parseFloat(produto.price) * produto.quantity
    valorTotal += valorProduto // Adicione o valor do produto ao valor total

    emailBody += `
      Produto ${index + 1}:
      - Nome: ${produto.name}
      - Quantidade: ${produto.quantity}
      - Valor total do produto: ${priceFormatter(valorProduto, 'BRL')} 
    `
  })

  // Adicione o valor total ao corpo do e-mail
  emailBody += `
    Valor total orçado: ${priceFormatter(valorTotal, 'BRL')}

    Em breve nossos vendedores entraram em contato.

    Atenciosamente,
    Equipe Camel
  `

  return emailBody
}
