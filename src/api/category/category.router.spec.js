import request from 'supertest'

import app from '../../app.js'
import sequelize from '../../config/sequelize.js'
import { loadSeedData } from '../../../test/utils/index.js'

beforeAll(async () => {
  await sequelize.sync({ force: true }) // Cria as tabelas no banco de dados de teste
  await loadSeedData('users')
})

afterAll(async () => {
  await sequelize.drop() // Apaga as tabelas no banco de dados de teste
  await sequelize.close() // Fecha a conexão com o banco de dados de teste
})

describe('[POST] - /categories', () => {
  it('should return 201 and create a new category', async () => {
    const response = await request(app).post('/categories').send({
      name: 'parafuso',
      description: 'parafuso do bão',
      type: 'produto',
    })

    expect(response.status).toBe(201)
  })

  it('should return 400 when invalid request body', async () => {
    const response = await request(app).post('/categories').send({
      any_value: 'invalid_value',
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 400 when the name is not provided', async () => {
    const response = await request(app).post('/categories').send({
      description: 'parafuso do bão',
      type: 'produto',
    })

    expect(response.status).toBe(400)
    expect(response.body.details[0].message).toBe('"name" is required')
  })

  it('should return 409 when category already exists', async () => {
    const response = await request(app).post('/categories').send({
      name: 'parafuso',
      description: 'Parafuso de cabeça grande',
      type: 'produto',
    })

    expect(response.status).toBe(409)
    expect(response.body).toHaveProperty('message', 'Categoria já cadastrada.')
  })
})
