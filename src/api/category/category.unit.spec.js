import { findUserByEmail } from './users.dao.js'
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

describe('[DAO] findCategoryByName', () => {
  it('should return category when category exists', async () => {
    const name = 'parafuso'
    const response = await findUserByEmail(name)

    expect(response).toBeDefined()
    expect(response.name).toBe(name)
  })

  it('should return undefined when category does not exist', async () => {
    const name = 'invalid_name'
    const response = await findUserByEmail(name)

    expect(response).toBeNull()
  })
})
