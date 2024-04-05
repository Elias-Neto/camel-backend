import request from 'supertest'

import app from '../../app.js'
import imageTypes from './image.type.js'
// import * as dao from './orders.dao.js'
import sequelize from '../../config/sequelize.js'
import { loadSeedData } from '../../../test/utils/index.js'

beforeAll(async () => {
  await sequelize.sync({ force: true }) // Cria as tabelas no banco de dados de teste
  await loadSeedData('users')
  await loadSeedData('products')
  await loadSeedData('images')
})

afterAll(async () => {
  await sequelize.drop() // Apaga as tabelas no banco de dados de teste
  await sequelize.close() // Fecha a conexão com o banco de dados de teste
})

describe('[POST] - /images', () => {
  //testes de criação precisão ser melhor implementados
  it('should return 201 and create a new image', async () => {
    const response = await request(app).post('/images').send({
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVUZ6d8RGF-wPGtNhgOBtgqHc9SjsHfIBNfcyPiwUTqw&s',
      related_id: '3c632086-d6a1-4772-ba19-15905026be9b',
      id_type: imageTypes.PRODUCT,
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })
})
