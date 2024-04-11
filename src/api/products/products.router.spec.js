import request from 'supertest'

import app from '../../app.js'
import * as dao from './products.dao.js'
import sequelize from '../../config/sequelize.js'
import { loadSeedData } from '../../../test/utils/index.js'
import * as helper from '../../helpers/object-helper.js'

beforeAll(async () => {
  await sequelize.sync({ force: true }) // Cria as tabelas no banco de dados de teste
  await loadSeedData('products')
  await loadSeedData('images-products')
})

afterAll(async () => {
  await sequelize.drop() // Apaga as tabelas no banco de dados de teste
  await sequelize.close() // Fecha a conexão com o banco de dados de teste
})

const validateProductSchema = product => {
  expect(product).toHaveProperty('available')
  expect(product).toHaveProperty('createdAt')
  expect(product).toHaveProperty('deletedAt')
  expect(product).toHaveProperty('description')
  expect(product).toHaveProperty('id')
  expect(product).toHaveProperty('name')
  expect(product).toHaveProperty('price')
  expect(product).toHaveProperty('updatedAt')
  expect(product).toHaveProperty('images')

  expect(product).toMatchObject({
    available: expect.any(Boolean),
    createdAt: expect.any(String),
    deletedAt: null,
    description: expect.any(String),
    id: expect.any(String),
    name: expect.any(String),
    price: expect.any(String),
    updatedAt: expect.any(String),
    ...(product.images.length && {
      images: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          src: expect.any(String),
          ...(!!product.images.product_id && {
            product_id: expect.any(String),
          }),
          ...(!!product.images.category_id && {
            category_id: expect.any(String),
          }),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          deletedAt: null,
        }),
      ]),
    }),
  })
}

const validateFetchProducts = (response, headerCount, bodyLength) => {
  expect(response.header).toHaveProperty('x-count')
  expect(response.header['x-count']).toBe(headerCount.toString())
  expect(response.body.length).toBe(bodyLength)

  response.body.forEach(validateProductSchema)
}

describe.skip('[POST] - /products', () => {
  it('should return 201 and create a new product', async () => {
    const response = await request(app).post('/products').send({
      name: 'Product Test 1',
      price: '100.00',
      description: 'Product Test 1 description',
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('should return 400 when invalid request body', async () => {
    const response = await request(app).post('/products').send({
      any_value: 'invalid_value',
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 409 when product already exists', async () => {
    const response = await request(app).post('/products').send({
      name: 'Product Test 1',
      price: '100.00',
      description: 'Product Test 1 description',
    })

    expect(response.status).toBe(409)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(dao, 'insertProduct').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).post('/products').send({
      name: 'Product Test 2',
      price: '100.00',
      description: 'Product Test 2 description',
    })

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})

describe('[GET] - /products', () => {
  const queryParams = {
    limit: 2,
    offset: 1,
    sortBy: 'name',
    sortOrder: 'asc',
    search: ' 5 ',
    available: false,
    price: ' 30.50 ',
  }

  it('should return 200 without pagination query params and list all products', async () => {
    const response = await request(app).get('/products')

    expect(response.status).toBe(200)
    validateFetchProducts(response, 5, 5)
  })

  it('should return 200 with pagination query params and a products list', async () => {
    const response = await request(app).get('/products').query({
      limit: queryParams.limit,
      offset: queryParams.offset,
      sortBy: queryParams.sortBy,
      sortOrder: queryParams.sortOrder,
    })

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(queryParams.limit)
    expect(response.body[0].name).toBe('Product 2')
    expect(response.body[1].name).toBe('Product 3')
    validateFetchProducts(response, 5, 2)
  })

  it('should return 200 with search pagination query param and a products list', async () => {
    const response = await request(app).get('/products').query({
      search: queryParams.search,
    })

    expect(response.status).toBe(200)
    expect(response.body[0].name).toBe('Product 5')
    validateFetchProducts(response, 1, 1)
  })

  it('should return 200 with available query param and a products list', async () => {
    const response = await request(app).get('/products').query({
      available: queryParams.available,
    })

    expect(response.status).toBe(200)
    expect(response.body[0].name).toBe('Product 5')
    validateFetchProducts(response, 1, 1)
  })

  it('should return 200 with price query param and a products list', async () => {
    const response = await request(app).get('/products').query({
      price: queryParams.price,
    })

    expect(response.status).toBe(200)
    expect(response.body[0].name).toBe('Product 3')
    validateFetchProducts(response, 1, 1)
  })

  it('should return 400 when invalid request query params', async () => {
    const response = await request(app).get('/products').query({
      any_value: 'invalid_value',
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(dao, 'findAndCountProducts').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).get('/products')

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})

describe('[GET] - /products/:productID', () => {
  const productID = '54ad1e07-e4a3-4b34-a1e3-a07313901487'

  it('should return 200 and a single product', async () => {
    const response = await request(app).get(`/products/${productID}`)

    expect(response.status).toBe(200)
    validateProductSchema(response.body)
  })

  it('should return 400 when invalid param', async () => {
    const value = 'invalid_value'

    const response = await request(app).get(`/products/${value}`)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 404 when product does not exist', async () => {
    const response = await request(app).get(
      '/products/54ad1e07-e4a3-4b34-a1e3-a07313901480',
    )

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(helper, 'isNullOrUndefined').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).get(`/products/${productID}`)

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})

describe.skip('[PUT] - /products/:productID', () => {
  const requestBody = {
    name: 'Product 1 UPDATED',
    description: 'Description of Product 1 UPDATED',
    price: '100.00',
  }

  const productID = '54ad1e07-e4a3-4b34-a1e3-a07313901487'

  it('should return 200 and update a single product', async () => {
    const response = await request(app)
      .put(`/products/${productID}`)
      .send(requestBody)

    expect(response.status).toBe(200)
    expect(response.body.id).toBe(productID)
    expect(response.body.name).toBe(requestBody.name)
    expect(response.body.description).toBe(requestBody.description)
    expect(response.body.price).toBe(requestBody.price)
  })

  it('should return 200 and set available product to false', async () => {
    const response = await request(app).put(`/products/${productID}`).send({
      available: false,
    })

    expect(response.status).toBe(200)
    expect(response.body.id).toBe(productID)
  })

  it('should return 400 when invalid request body', async () => {
    const response = await request(app).put(`/products/${productID}`).send({
      any_value: 'invalid_value',
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 404 when product does not exist', async () => {
    const response = await request(app)
      .put('/products/54ad1e07-e4a3-4b34-a1e3-a07313901480')
      .send(requestBody)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 409 when product name already exists', async () => {
    const response = await request(app)
      .put(`/products/${productID}`)
      .send({
        ...requestBody,
        name: 'Product 2',
      })

    expect(response.status).toBe(409)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(dao, 'updateProduct').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app)
      .put(`/products/${productID}`)
      .send({
        ...requestBody,
        name: 'Product 1 UPDATED 2',
      })

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})

describe.skip('[DELETE] - /products/:productID', () => {
  const productID = '54ad1e07-e4a3-4b34-a1e3-a07313901487'

  it('should return 204 and delete a single product', async () => {
    const response = await request(app).delete(`/products/${productID}`)

    expect(response.status).toBe(204)
  })

  it('should return 400 when invalid param', async () => {
    const value = 'invalid_value'

    const response = await request(app).delete(`/products/${value}`)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 404 when product does not exist', async () => {
    const response = await request(app).delete(
      '/products/54ad1e07-e4a3-4b34-a1e3-a07313901487',
    )

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(dao, 'deleteProduct').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).delete(
      '/products/3c632086-d6a1-4772-ba19-15905026be9b',
    )

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})
