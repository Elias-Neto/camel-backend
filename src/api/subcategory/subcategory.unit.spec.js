import { findSubcategoryByName } from './subcategory.dao.js'
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

describe('[DAO] findSubcategoryByName', () => {
  it('should return subcategory when subcategory exists', async () => {
    const name = 'lampada'
    const response = await findSubcategoryByName(name)

    expect(response).toBeDefined()
    expect(response.name).toBe(name)
  })

  it('should return undefined when subcategory does not exist', async () => {
    const name = 'invalid_name'
    const response = await findSubcategoryByName(name)

    expect(response).toBeNull()
  })
})
