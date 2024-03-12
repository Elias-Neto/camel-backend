import request from 'supertest'

import app from '../../app.js'
import sequelize from '../../config/sequelize.js'
import { loadSeedData } from '../../../test/utils/index.js'

beforeAll(async () => {
  await sequelize.sync({ force: true }) // Cria as tabelas no banco de dados de teste
  await loadSeedData('users')
  await loadSeedData('orders')
  await loadSeedData('products')
})

afterAll(async () => {
  await sequelize.drop() // Apaga as tabelas no banco de dados de teste
  await sequelize.close() // Fecha a conexão com o banco de dados de teste
})

describe.only('[POST] - /orders', () => {
  const requestBody = {
    total: 'R$ 100,00',
    userID: 'b7ce969d-f59d-4df9-8f98-cb2e171aef85',
    products: [
      {
        id: '54ad1e07-e4a3-4b34-a1e3-a07313901487',
        quantity: 1,
      },
      {
        id: '3c632086-d6a1-4772-ba19-15905026be9b',
        quantity: 2,
      },
    ],
  }

  it('should return 400 when invalid request body', async () => {
    const response = await request(app).post('/orders').send({
      any_value: 'invalid_value',
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 404 when user not found', async () => {
    const response = await request(app)
      .post('/orders')
      .send({
        ...requestBody,
        userID: 'b7ce969d-f59d-4df9-8f98-cb2e171aef86',
      })

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 404 when product not found', async () => {
    const response = await request(app)
      .post('/orders')
      .send({
        ...requestBody,
        products: [
          {
            id: '54ad1e07-e4a3-4b34-a1e3-a07313901487',
            quantity: 1,
          },
          {
            id: 'b7ce969d-f59d-4df9-8f98-cb2e171aef85',
            quantity: 2,
          },
        ],
      })

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})
