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
      confirmedPassword: 'senha1234',
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

  it('should return 400 when the password is less than 6 characters', async () => {
    const response = await request(app).post('/users').send({
      name: 'Izabela Cristina',
      email: 'izabela.cristina@example.com',
      password: '12345',
      confirmedPassword: '12345',
    })

    expect(response.status).toBe(400)
    expect(response.body.details[0].message).toBe(
      'A senha deve ter no mínimo 6 caracteres e conter letras e números.',
    )
  })

  it('should return 400 when the password does not contain letters and numbers', async () => {
    const response = await request(app).post('/users').send({
      name: 'Izabela Cristina',
      email: 'izabela.cristina@example.com',
      password: '123456',
      confirmedPassword: '123456',
    })

    expect(response.status).toBe(400)
    expect(response.body.details[0].message).toBe(
      'A senha deve ter no mínimo 6 caracteres e conter letras e números.',
    )
  })

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

  it('should return 409 when user already exists', async () => {
    const response = await request(app).post('/users').send({
      name: 'João Silva Costa',
      email: 'joao.silva@example.com',
      password: 'senha123',
      confirmedPassword: 'senha123',
    })

    expect(response.status).toBe(409)
    expect(response.body).toHaveProperty('message', 'Email já cadastrado.')
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
