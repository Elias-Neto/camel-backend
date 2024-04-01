import request from 'supertest'

import app from '../../app.js'
import * as dao from './categories.dao.js'
import sequelize from '../../config/sequelize.js'
import * as helper from '../../helpers/object-helper.js'
import { loadSeedData } from '../../../test/utils/index.js'

beforeAll(async () => {
  await sequelize.sync({ force: true }) // Cria as tabelas no banco de dados de teste
  await loadSeedData('categories')
})

afterAll(async () => {
  await sequelize.drop() // Apaga as tabelas no banco de dados de teste
  await sequelize.close() // Fecha a conexão com o banco de dados de teste
})

describe('[POST] - /categories', () => {
  it('should return 201 and create a new category', async () => {
    const response = await request(app).post('/categories').send({
      name: 'parafusinho',
      description: 'parafuso do bão',
      type: 'produto',
    })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
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

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(dao, 'insertCategory').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).post('/categories').send({
      name: 'prego pregoso',
      description: 'Parafuso de cabeça grande',
      type: 'produto',
    })

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})

describe('[GET] - /categories', () => {
  const queryParams = {
    limit: 2,
    offset: 1,
    sortBy: 'name',
    sortOrder: 'asc',
    search: 'parafuso',
  }

  it('should return 200 without pagination query params and list all categories', async () => {
    const response = await request(app).get('/categories')

    expect(response.status).toBe(200)
    expect(Number(response.headers['x-count'])).toBeGreaterThan(1)
  })

  it('should return 200 with pagination query params and a list categories', async () => {
    const response = await request(app).get('/categories').query({
      limit: queryParams.limit,
      offset: queryParams.offset,
      sortBy: queryParams.sortBy,
      sortOrder: queryParams.sortOrder,
    })

    expect(response.status).toBe(200)
    expect(Number(response.headers['x-count'])).toBeGreaterThan(
      queryParams.limit,
    )
    expect(response.body.length).toBe(queryParams.limit)
    expect(response.body[0].name).toBe('parafusinho')
    expect(response.body[1].name).toBe('parafuso')
  })

  it('should return 200 with search pagination query param and a list categories', async () => {
    const response = await request(app).get('/categories').query({
      search: queryParams.search,
    })

    expect(response.status).toBe(200)
    expect(Number(response.headers['x-count'])).toBe(1)
    expect(response.body[0].name).toBe('parafuso')
  })

  it('should return 400 when invalid request query params', async () => {
    const response = await request(app).get('/categories').query({
      any_value: 'invalid_value',
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(dao, 'findAndCountCategories').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).get('/categories')

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})

describe('[GET] - /categories/:categoryID', () => {
  const categoryID = 'ceb3ec8a-a3e3-426c-92b6-aca71a8c0558'

  it('should return 200 and a single category', async () => {
    const response = await request(app).get(`/categories/${categoryID}`)

    expect(response.status).toBe(200)

    expect(response.body.id).toBe(categoryID)
  })

  it('should return 400 when invalid param', async () => {
    const value = 'invalid_value'

    const response = await request(app).get(`/categories/${value}`)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 404 when categories does not exist', async () => {
    const response = await request(app).get(
      '/categories/54ad1e07-e4a3-4b34-a1e3-a07313901480',
    )

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(helper, 'isNullOrUndefined').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).get(`/categories/${categoryID}`)

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})

describe('[PUT] - /categories/:categoriesID', () => {
  const requestBody = {
    name: 'parafuso',
    description: 'parafuso do bão',
    type: 'produto',
  }

  const categoryID = 'ceb3ec8a-a3e3-426c-92b6-aca71a8c0558'

  it('should return 200 and update a single category', async () => {
    const response = await request(app)
      .put(`/categories/${categoryID}`)
      .send(requestBody)

    expect(response.status).toBe(200)
    expect(response.body.id).toBe(categoryID)
    expect(response.body.name).toBe(requestBody.name)
  })

  it('should return 400 when invalid request body', async () => {
    const response = await request(app).put(`/categories/${categoryID}`).send({
      second_name: 'invalid_value',
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 404 when category does not exist', async () => {
    const response = await request(app)
      .put(`/categories/${'54ad1e07-e4a3-4b34-a1e3-a07313901480'}`)
      .send(requestBody)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 409 when category already exists', async () => {
    const response = await request(app)
      .put(`/categories/${categoryID}`)
      .send({
        ...requestBody,
        name: 'parafuso',
      })

    expect(response.status).toBe(409)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(helper, 'isNullOrUndefined').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).get(`/categories/${categoryID}`)

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})

describe('[DELETE] - /categories/:categoriesID', () => {
  const categoryID = 'ceb3ec8a-a3e3-426c-92b6-aca71a8c0558'

  it('should return 204 and delete a single category', async () => {
    const response = await request(app).delete(`/categories/${categoryID}`)

    expect(response.status).toBe(204)
  })

  it('should return 400 when invalid param', async () => {
    const value = 'pregario'

    const response = await request(app).delete(`/categories/${value}`)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 404 when category does not exist', async () => {
    const response = await request(app).delete(
      '/categories/54ad1e07-e4a3-4b34-a1e3-a07313901487',
    )

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(dao, 'deleteCategory').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).delete(
      '/categories/ceb3ec8a-a3e3-426c-92b6-aca71a8c0558',
    )

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})
