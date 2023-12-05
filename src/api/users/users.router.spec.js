import request from 'supertest'

import app from '../../app.js'
import * as usersDao from '../users/users.dao.js'
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

describe('[POST] - /users', () => {
  it('should return 201 and create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Izabela Cristina',
      email: 'izabela.cristina@example.com',
      password: 'senha123',
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('should return 400 when invalid request body', async () => {
    const response = await request(app).post('/users').send({
      any_value: 'invalid_value',
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 409 when user already exists', async () => {
  it('should return 400 when passwords do not match', async () => {
    const response = await request(app).post('/users').send({
      name: 'Izabela Cristina',
      email: 'izabela.cristina@example.com',
      password: 'senha123',
      confirmedPassword: 'invalid_password',
    })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('As senhas devem ser iguais.')
  })

    })

    expect(response.status).toBe(409)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(usersDao, 'insertUser').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).post('/users').send({
      name: 'Maria José',
      email: 'maria.jose@example.com',
      password: 'senha321',
    })

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})
