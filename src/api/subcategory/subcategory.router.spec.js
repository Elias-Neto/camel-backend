import request from 'supertest'

import app from '../../app.js'
import * as dao from './subcategory.dao.js'
import sequelize from '../../config/sequelize.js'
import { loadSeedData } from '../../../test/utils/index.js'
import * as helper from '../../helpers/object-helper.js'

beforeAll(async () => {
  await sequelize.sync({ force: true }) // Cria as tabelas no banco de dados de teste
  await loadSeedData('subcategory')
})

afterAll(async () => {
  await sequelize.drop() // Apaga as tabelas no banco de dados de teste
  await sequelize.close() // Fecha a conexão com o banco de dados de teste
})

describe('[POST] - /subcategories', () => {
  it('should return 201 and create a new subcategory', async () => {
    const response = await request(app).post('/subcategories').send({
      name: 'Subcategory Test 1',
      category_id: '2d9ea264-6c46-4fb7-8d2d-e75e72146317',
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('should return 400 when invalid request body', async () => {
    const response = await request(app).post('/subcategories').send({
      any_value: 'invalid_value',
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 409 when subcategory already exists', async () => {
    const response = await request(app).post('/subcategories').send({
      name: 'Subcategory Test 1',
      description: 'Bom Demais',
      type: 'maravilha',
    })

    expect(response.status).toBe(409)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(dao, 'insertSubcategory').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).post('/subcategories').send({
      name: 'Subcategory Test 2',
      description: 'ruim Demais',
      type: 'not_good',
    })

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})

describe('[GET] - /subcategories', () => {
  const queryParams = {
    limit: 2,
    offset: 1,
    sortBy: 'name',
    sortOrder: 'asc',
    search: ' 5 ',
  }

  it('should return 200 without pagination query params and list all subcategories', async () => {
    const response = await request(app).get('/subcategories')

    expect(response.status).toBe(200)
    expect(Number(response.headers['x-count'])).toBeGreaterThan(1)
  })

  it('should return 200 with pagination query params and a subcategories list', async () => {
    const response = await request(app).get('/subcategories').query({
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
    expect(response.body[0].name).toBe('Subcategory 2')
    expect(response.body[1].name).toBe('Subcategory 3')
  })

  it('should return 200 with search pagination query param and a subcategories list', async () => {
    const response = await request(app).get('/subcategories').query({
      search: queryParams.search,
    })

    expect(response.status).toBe(200)
    expect(Number(response.headers['x-count'])).toBe(1)
    expect(response.body[0].name).toBe('Subcategory 5')
  })

  it('should return 400 when invalid request query params', async () => {
    const response = await request(app).get('/subcategories').query({
      any_value: 'invalid_value',
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(dao, 'findAndCountSubcategories').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).get('/subcategories')

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})

describe('[GET] - /subcategories/:subcategoriesID', () => {
  const subcategoryID = '54ad1e07-e4a3-4b34-a1e3-a07313901487'

  it('should return 200 and a single subcategory', async () => {
    const response = await request(app).get(`/subcategories/${subcategoryID}`)

    expect(response.status).toBe(200)

    expect(response.body.id).toBe(subcategoryID)
  })

  it('should return 400 when invalid param', async () => {
    const value = 'invalid_value'

    const response = await request(app).get(`/subcategories/${value}`)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 404 when subcategory does not exist', async () => {
    const response = await request(app).get(
      '/subcategories/54ad1e07-e4a3-4b34-a1e3-a07313901480',
    )

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(helper, 'isNullOrUndefined').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).get(`/subcategories/${subcategoryID}`)

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})

describe('[PUT] - /subcategories/:subcategoryID', () => {
  const requestBody = {
    name: 'subcategory 1 UPDATED',
    description: 'Description of subcategory 1 UPDATED',
    type: 'novo tipo',
  }

  const subcategoryID = '54ad1e07-e4a3-4b34-a1e3-a07313901487'

  it('should return 200 and update a single product', async () => {
    const response = await request(app)
      .put(`/subcategories/${subcategoryID}`)
      .send(requestBody)

    expect(response.status).toBe(200)
    expect(response.body.id).toBe(subcategoryID)
    expect(response.body.name).toBe(requestBody.name)
    expect(response.body.description).toBe(requestBody.description)
    expect(response.body.type).toBe(requestBody.type)
  })

  /*it('should return 200 and set available subcategory to false', async () => {
    const response = await request(app).put(`/subcategory/${subcategoryID}`).send({
      available: false,
    })

    expect(response.status).toBe(200)
    expect(response.body.id).toBe(subcategoryID)
  })*/ //Não se Aplica

  it('should return 400 when invalid request body', async () => {
    const response = await request(app)
      .put(`/subcategories/${subcategoryID}`)
      .send({
        any_value: 'invalid_value',
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 404 when subcategory does not exist', async () => {
    const response = await request(app)
      .put('/subcategories/54ad1e07-e4a3-4b34-a1e3-a07313901480')
      .send(requestBody)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 409 when subcategory name already exists', async () => {
    const response = await request(app)
      .put(`/subcategories/${subcategoryID}`)
      .send({
        ...requestBody,
        name: 'Subcategory 2',
      })

    expect(response.status).toBe(409)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(dao, 'updateSubcategory').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app)
      .put(`/subcategories/${subcategoryID}`)
      .send({
        ...requestBody,
        name: 'subcategory 1 UPDATED 2',
      })

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})

describe('[DELETE] - /subcategories/:subcategoryID', () => {
  const subcategoryID = '54ad1e07-e4a3-4b34-a1e3-a07313901487'

  it('should return 204 and delete a single subcategory', async () => {
    const response = await request(app).delete(
      `/subcategories/${subcategoryID}`,
    )

    expect(response.status).toBe(204)
  })

  it('should return 400 when invalid param', async () => {
    const value = 'invalid_value'

    const response = await request(app).delete(`/subcategories/${value}`)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 404 when subcategory does not exist', async () => {
    const response = await request(app).delete(
      '/subcategories/3c633019-d6a1-4772-ba19-15905026be9b',
    )

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(dao, 'deleteSubcategory').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).delete(
      '/subcategories/3c632086-d6a1-4772-ba19-15905026be9b',
    )

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})
