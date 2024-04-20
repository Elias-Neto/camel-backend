export default {
  openapi: '3.0.0',
  info: {
    title: 'API - Camel',
    version: '1.0.0',
    description: 'Documentação completa da API da plataforma da Camel',
  },
  servers: [
    {
      url: 'https://camel-api-efnk.onrender.com',
    },
    {
      url: 'http://localhost:8000',
    },
  ],
  tags: [
    {
      name: 'Usuários',
      description: 'Módulo de usuários',
    },
    {
      name: 'Pedidos',
      description: 'Módulo de pedidos',
    },
    {
      name: 'Produtos',
      description: 'Módulo de produtos',
    },
    {
      name: 'Categorias',
      description: 'Módulo de categorias',
    },
  ],
  paths: {
    '/users': {
      post: {
        summary: 'Criar usuário',
        description: 'Cria um novo usuário com os dados fornecidos',
        tags: ['Usuários'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Nome do usuário',
                    example: 'John Doe',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    description: 'Endereço de e-mail do usuário',
                    example: 'john.doe@email.com',
                  },
                  password: {
                    type: 'string',
                    format: 'password',
                    description:
                      'Senha do usuário (deve ter mais de 6 caracteres e conter letras e números)',
                    example: 'password123',
                  },
                  confirmedPassword: {
                    type: 'string',
                    format: 'password',
                    description: 'Confirmação da senha do usuário',
                    example: 'password123',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Usuário criado com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      format: 'uuid',
                      description: 'Código de identificação do usuário',
                      example: '123e4567-e89b-12d3-a456-426614174000',
                    },
                    name: {
                      type: 'string',
                      description: 'Nome do usuário',
                    },
                    email: {
                      type: 'string',
                      format: 'email',
                      description: 'Endereço de e-mail do usuário',
                    },
                    password: {
                      type: 'string',
                      format: 'password',
                      description: 'Senha do usuário',
                    },
                  },
                  required: ['id', 'name', 'email'],
                },
              },
            },
          },
          400: {
            description: 'Requisição inválida',
          },
          409: {
            description: 'Email já cadastrado.',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
      get: {
        summary: 'Listar usuários',
        description: 'Obtém uma lista de todos os usuários',
        tags: ['Usuários'],
        responses: {
          200: {
            description: 'Lista de todos os usuários',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        format: 'uuid',
                        description: 'Código de identificação do usuário',
                        example: '123e4567-e89b-12d3-a456-426614174000',
                      },
                      name: {
                        type: 'string',
                        description: 'Nome do usuário',
                        example: 'John Doe',
                      },
                      email: {
                        type: 'string',
                        formart: 'email',
                        example: 'john.doe@email.com',
                        description: 'Endereço de e-mail do usuário',
                      },
                      password: {
                        type: 'string',
                        format: 'password',
                        example: 'password123',
                        description: 'Senha do usuário',
                      },
                      cpf: {
                        type: 'string',
                        format: 'cpf',
                        example: '123.456.789-00',
                        description: 'CPF do usuário',
                      },
                      phone: {
                        type: 'string',
                        format: 'phone',
                        example: '(11) 1234-5678',
                        description: 'Telefone do usuário',
                      },
                      createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2022-01-01T00:00:00.000Z',
                        description: 'Data de criação do usuário',
                      },
                      updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2022-01-01T00:00:00.000Z',
                        description: 'Data de atualização do usuário',
                      },
                      deletedAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2022-01-01T00:00:00.000Z',
                        description: 'Data de remoção do usuário',
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
    },
    '/users/{userID}': {
      put: {
        summary: 'Atualizar usuário',
        description: 'Atualiza um usuário específico',
        tags: ['Usuários'],
        parameters: [
          {
            name: 'userID',
            in: 'path',
            required: true,
            description: 'Código de identificação do usuário',
            schema: {
              type: 'string',
              format: 'uuid',
            },
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Nome do usuário',
                    example: 'John Doe',
                  },
                  email: {
                    type: 'string',
                    formart: 'email',
                    example: 'johndoe@email.com',
                    description: 'Endereço de e-mail do usuário',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Usuario atualizado com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      format: 'uuid',
                      description: 'Código de identificação do usuário',
                      example: '123e4567-e89b-12d3-a456-426614174000',
                    },
                    name: {
                      type: 'string',
                      description: 'Nome do usuário',
                      example: 'John Doe',
                    },
                    email: {
                      type: 'string',
                      formart: 'email',
                      example: 'john.doe@email.com',
                      description: 'Endereço de e-mail do usuário',
                    },
                    password: {
                      type: 'string',
                      format: 'password',
                      example: 'password123',
                      description: 'Senha do usuário',
                    },
                    cpf: {
                      type: 'string',
                      format: 'cpf',
                      example: '123.456.789-00',
                      description: 'CPF do usuário',
                    },
                    phone: {
                      type: 'string',
                      format: 'phone',
                      example: '(11) 1234-5678',
                      description: 'Telefone do usuário',
                    },
                    createdAt: {
                      type: 'string',
                      format: 'date-time',
                      example: '2022-01-01T00:00:00.000Z',
                      description: 'Data de criação do usuário',
                    },
                    updatedAt: {
                      type: 'string',
                      format: 'date-time',
                      example: '2022-01-01T00:00:00.000Z',
                      description: 'Data de atualização do usuário',
                    },
                    deletedAt: {
                      type: 'string',
                      format: 'date-time',
                      example: '2022-01-01T00:00:00.000Z',
                      description: 'Data de remoção do usuário',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Requisição inválida',
          },
          404: {
            description: 'Usuario não encontrada',
          },
          409: {
            description: 'Conflito - o nome do usuario já existe',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
    },
    '/sessions': {
      post: {
        summary: 'Cria uma nova sessão',
        description: 'Cria uma nova sessão com as credenciais fornecidas',
        tags: ['Sessions'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' },
                },
                required: ['email', 'password'],
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Sessão criada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: { type: 'string' },
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                      },
                      required: ['id', 'name', 'email'],
                    },
                  },
                  required: ['token', 'user'],
                },
              },
            },
          },
          400: {
            description: 'Requisição inválida',
          },
          401: {
            description: 'Credenciais inválidas',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                  },
                  required: ['message'],
                },
              },
            },
          },
          404: {
            description: 'Usuário não encontrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                  },
                  required: ['message'],
                },
              },
            },
          },
          500: {
            description: 'Erro interno do servidor',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                  },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
    '/products': {
      post: {
        summary: 'Cria produto',
        description: 'Cria um novo produto com os dados fornecidos',
        tags: ['Produtos'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Nome do produto',
                    example: 'Lâmpada',
                  },
                  description: {
                    type: 'string',
                    description: 'Descrição do produto',
                    example: 'Lâmpada incandescente',
                  },
                  price: {
                    type: 'string',
                    description: 'Preço do produto',
                    example: '25.00',
                  },
                  available: {
                    type: 'boolean',
                    description: 'Disponibilidade do produto',
                    example: true,
                  },
                  subcategoryID: {
                    type: 'string',
                    format: 'uuid',
                    description: 'ID da subcategoria a qual o produto pertence',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                  },
                },
                required: ['name', 'description', 'price'],
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Produto criado com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      description: 'ID do produto criado',
                      example: '216ac4f6-8ff4-4704-9320-0ff6e76d534f',
                    },
                    available: {
                      type: 'boolean',
                      description: 'Disponibilidade do produto',
                      example: true,
                    },
                    name: {
                      type: 'string',
                      description: 'Nome do produto',
                      example: 'Lâmpada',
                    },
                    price: {
                      type: 'string',
                      description: 'Preço do produto',
                      example: '25.00',
                    },
                    description: {
                      type: 'string',
                      description: 'Descrição do produto',
                      example: 'Lâmpada incandescente',
                    },
                    subcategory_id: {
                      type: 'string',
                      description: 'ID da subcategoria do produto',
                      example: '123e4567-e89b-12d3-a456-426614174000',
                    },
                    updatedAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Data de atualização do produto',
                      example: '2024-04-19T23:38:13.958Z',
                    },
                    createdAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Data de criação do produto',
                      example: '2024-04-19T23:38:13.958Z',
                    },
                    deletedAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Data de remoção do produto',
                      example: null,
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Requisição inválida',
          },
          409: {
            description: 'Conflito - o produto já existe',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
      get: {
        summary: 'Listar produtos',
        description: 'Obtém uma lista de todos os produtos',
        tags: ['Produtos'],
        parameters: [
          {
            in: 'query',
            name: 'limit',
            schema: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 10,
            },
            description: 'Número máximo de resultados por página',
            example: 10,
          },
          {
            in: 'query',
            name: 'offset',
            schema: {
              type: 'integer',
              minimum: 0,
              default: 0,
            },
            description:
              'Número de resultados a serem ignorados antes de iniciar a contagem dos resultados da página',
            example: 0,
          },
          {
            in: 'query',
            name: 'sortBy',
            schema: {
              type: 'string',
              default: 'id',
            },
            description: 'Campo pelo qual os resultados serão ordenados',
            example: 'id',
          },
          {
            in: 'query',
            name: 'search',
            schema: {
              type: 'string',
            },
            description: 'Termo de pesquisa para filtrar resultados',
            example: 'produto',
          },
          {
            in: 'query',
            name: 'sortOrder',
            schema: {
              type: 'string',
              enum: ['asc', 'desc'],
              default: 'desc',
            },
            description:
              'Ordem de classificação dos resultados (ascendente ou descendente)',
            example: 'desc',
          },
          {
            in: 'query',
            name: 'name',
            schema: {
              type: 'string',
            },
            description: 'Nome do produto',
            example: 'Camiseta',
          },
          {
            in: 'query',
            name: 'price',
            schema: {
              type: 'string',
            },
            description: 'Preço do produto',
            example: '25.00',
          },
          {
            in: 'query',
            name: 'available',
            schema: {
              type: 'boolean',
            },
            description: 'Disponibilidade do produto',
            example: true,
          },
          {
            in: 'query',
            name: 'subcategoryID',
            schema: {
              type: 'string',
              format: 'uuid',
            },
            description: 'ID da subcategoria do produto',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
        ],
        responses: {
          200: {
            description: 'Lista de produtos obtida com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        format: 'uuid',
                        description: 'ID único do produto',
                      },
                      name: {
                        type: 'string',
                        description: 'Nome do produto',
                      },
                      price: {
                        type: 'string',
                        description: 'Preço do produto',
                      },
                      description: {
                        type: 'string',
                        description: 'Descrição do produto',
                      },
                      available: {
                        type: 'boolean',
                        description: 'Disponibilidade do produto',
                      },
                      createdAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Data e hora de criação do produto',
                      },
                      updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        description:
                          'Data e hora da última atualização do produto',
                      },
                      deletedAt: {
                        type: ['string', 'null'],
                        format: 'date-time',
                        description:
                          'Data e hora de exclusão do produto (se aplicável)',
                      },
                      subcategory_id: {
                        type: 'string',
                        format: 'uuid',
                        description: 'ID da subcategoria do produto',
                      },
                      images: {
                        type: 'array',
                        description: 'Array de imagens associadas ao produto',
                        items: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'string',
                              format: 'uuid',
                              description: 'ID único da imagem',
                            },
                            src: {
                              type: 'string',
                              format: 'uri',
                              description: 'URL da imagem',
                            },
                            createdAt: {
                              type: 'string',
                              format: 'date-time',
                              description: 'Data e hora de criação da imagem',
                            },
                            updatedAt: {
                              type: 'string',
                              format: 'date-time',
                              description:
                                'Data e hora da última atualização da imagem',
                            },
                            deletedAt: {
                              type: ['string', 'null'],
                              format: 'date-time',
                              description:
                                'Data e hora de exclusão da imagem (se aplicável)',
                            },
                            product_id: {
                              type: 'string',
                              format: 'uuid',
                              description: 'ID do produto associado à imagem',
                            },
                          },
                          required: [
                            'id',
                            'src',
                            'createdAt',
                            'updatedAt',
                            'product_id',
                          ],
                        },
                      },
                    },
                    required: [
                      'id',
                      'name',
                      'price',
                      'description',
                      'available',
                      'createdAt',
                      'updatedAt',
                      'subcategory_id',
                      'images',
                    ],
                  },
                },
                example: [
                  {
                    id: 'f6894cd4-71b1-454b-b5ad-207fa0da19b8',
                    name: 'Intelligent Wooden Pants',
                    price: '181.00',
                    description:
                      'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
                    available: true,
                    createdAt: '2040-03-17T01:06:05.170Z',
                    updatedAt: '2024-05-30T00:22:23.853Z',
                    deletedAt: null,
                    subcategory_id: 'f3e8cd2e-f640-4949-a43f-a337adbe3d91',
                    images: [
                      {
                        id: '0518c433-477a-4a7b-b8b6-f718d7335752',
                        src: 'https://loremflickr.com/640/480',
                        createdAt: '2092-03-09T18:40:54.977Z',
                        updatedAt: '2049-07-18T14:49:02.052Z',
                        deletedAt: null,
                        product_id: 'f6894cd4-71b1-454b-b5ad-207fa0da19b8',
                      },
                    ],
                  },
                ],
              },
            },
          },
          400: {
            description: 'Requisição inválida',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
    },
    '/products/{productID}': {
      get: {
        summary: 'Obter produto produto específico',
        description: 'Obtém um produto pelo ID fornecido',
        tags: ['Produtos'],
        parameters: [
          {
            name: 'productID',
            in: 'path',
            required: true,
            description: 'Código de identificação do prouduto',
            schema: {
              type: 'string',
              format: 'uuid',
            },
            example: 'f6894cd4-71b1-454b-b5ad-207fa0da19b8',
          },
        ],
        responses: {
          200: {
            description: 'Produto obtido com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      format: 'uuid',
                      description: 'ID único do produto',
                    },
                    name: {
                      type: 'string',
                      description: 'Nome do produto',
                    },
                    price: {
                      type: 'string',
                      description: 'Preço do produto',
                    },
                    description: {
                      type: 'string',
                      description: 'Descrição do produto',
                    },
                    available: {
                      type: 'boolean',
                      description: 'Disponibilidade do produto',
                    },
                    createdAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Data e hora de criação do produto',
                    },
                    updatedAt: {
                      type: 'string',
                      format: 'date-time',
                      description:
                        'Data e hora da última atualização do produto',
                    },
                    deletedAt: {
                      type: ['string', 'null'],
                      format: 'date-time',
                      description:
                        'Data e hora de exclusão do produto (se aplicável)',
                    },
                    subcategory_id: {
                      type: 'string',
                      format: 'uuid',
                      description: 'ID da subcategoria do produto',
                    },
                    images: {
                      type: 'array',
                      description: 'Array de imagens associadas ao produto',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID único da imagem',
                          },
                          src: {
                            type: 'string',
                            format: 'uri',
                            description: 'URL da imagem',
                          },
                          createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data e hora de criação da imagem',
                          },
                          updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description:
                              'Data e hora da última atualização da imagem',
                          },
                          deletedAt: {
                            type: ['string', 'null'],
                            format: 'date-time',
                            description:
                              'Data e hora de exclusão da imagem (se aplicável)',
                          },
                          product_id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID do produto associado à imagem',
                          },
                        },
                        required: [
                          'id',
                          'src',
                          'createdAt',
                          'updatedAt',
                          'product_id',
                        ],
                      },
                    },
                  },
                  required: [
                    'id',
                    'name',
                    'price',
                    'description',
                    'available',
                    'createdAt',
                    'updatedAt',
                    'subcategory_id',
                    'images',
                  ],
                },
                example: {
                  id: 'f6894cd4-71b1-454b-b5ad-207fa0da19b8',
                  name: 'Intelligent Wooden Pants',
                  price: '181.00',
                  description:
                    'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
                  available: true,
                  createdAt: '2040-03-17T01:06:05.170Z',
                  updatedAt: '2024-05-30T00:22:23.853Z',
                  deletedAt: null,
                  subcategory_id: 'f3e8cd2e-f640-4949-a43f-a337adbe3d91',
                  images: [
                    {
                      id: '0518c433-477a-4a7b-b8b6-f718d7335752',
                      src: 'https://loremflickr.com/640/480',
                      createdAt: '2092-03-09T18:40:54.977Z',
                      updatedAt: '2049-07-18T14:49:02.052Z',
                      deletedAt: null,
                      product_id: 'f6894cd4-71b1-454b-b5ad-207fa0da19b8',
                    },
                  ],
                },
              },
            },
          },

          400: {
            description: 'ID do produto inválido',
          },
          404: {
            description: 'Produto não encontrado',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
      put: {
        summary: 'Atualizar produto',
        description: 'Atualiza um produto pelo ID fornecido',
        tags: ['Produtos'],
        parameters: [
          {
            name: 'productID',
            in: 'path',
            required: true,
            description: 'Código de identificação do prouduto',
            schema: {
              type: 'string',
              format: 'uuid',
            },
            example: 'f6894cd4-71b1-454b-b5ad-207fa0da19b8',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Nome do produto',
                    example: 'Lâmpada',
                  },
                  description: {
                    type: 'string',
                    description: 'Descrição do produto',
                    example: 'Lâmpada incandescente',
                  },
                  price: {
                    type: 'string',
                    description: 'Preço do produto',
                    example: '25.00',
                  },
                  available: {
                    type: 'boolean',
                    description: 'Disponibilidade do produto',
                    example: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Produto atualizado com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      description: 'ID do produto criado',
                      example: '216ac4f6-8ff4-4704-9320-0ff6e76d534f',
                    },
                    available: {
                      type: 'boolean',
                      description: 'Disponibilidade do produto',
                      example: true,
                    },
                    name: {
                      type: 'string',
                      description: 'Nome do produto',
                      example: 'Lâmpada',
                    },
                    price: {
                      type: 'string',
                      description: 'Preço do produto',
                      example: '25.00',
                    },
                    description: {
                      type: 'string',
                      description: 'Descrição do produto',
                      example: 'Lâmpada incandescente',
                    },
                    subcategory_id: {
                      type: 'string',
                      description: 'ID da subcategoria do produto',
                      example: '123e4567-e89b-12d3-a456-426614174000',
                    },
                    updatedAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Data de atualização do produto',
                      example: '2024-04-19T23:38:13.958Z',
                    },
                    createdAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Data de criação do produto',
                      example: '2024-04-19T23:38:13.958Z',
                    },
                    deletedAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Data de remoção do produto',
                      example: null,
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Requisição inválida',
          },
          404: {
            description: 'Produto não encontrado',
          },
          409: {
            description: 'Conflito - o nome do produto já existe',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
      delete: {
        summary: 'Excluir produto',
        description: 'Exclui um produto pelo ID fornecido',
        tags: ['Produtos'],
        parameters: [
          {
            name: 'productID',
            in: 'path',
            required: true,
            description: 'Código de identificação do prouduto',
            schema: {
              type: 'string',
              format: 'uuid',
            },
            example: 'f6894cd4-71b1-454b-b5ad-207fa0da19b8',
          },
        ],
        responses: {
          204: {
            description: 'Produto excluído com sucesso',
          },
          400: {
            description: 'ID do produto inválido',
          },
          404: {
            description: 'Produto não encontrado',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
    },
    '/subcategories': {
      post: {
        summary: 'Criar uma nova subcategoria',
        description: 'Cria uma nova subcategoria com os dados fornecidos',
        tags: ['Subcategorias'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  category_id: { type: 'string' },
                },
                required: ['name', 'category_id'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Subcategoria criada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                    category_id: { type: 'string', format: 'uuid' },
                  },
                  required: ['id', 'name', 'category_id'],
                },
                example: {
                  id: '95ac318f-7090-4905-96cc-c56d406a9536',
                  name: 'string',
                  createdAt: '2024-04-20T00:12:02.699Z',
                  updatedAt: '2024-04-20T00:12:02.699Z',
                  deletedAt: null,
                  category_id: 'b1475cc6-750f-4dc1-8d48-21f8b8216f3f',
                },
              },
            },
          },
          400: {
            description: 'Requisição inválida',
          },
          409: {
            description: 'Conflito - a subcategoria já existe',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
      get: {
        summary: 'Obter uma lista de subcategorias',
        description: 'Obtém uma lista de todas as subcategorias',
        tags: ['Subcategorias'],
        responses: {
          200: {
            description: 'Lista de subcategorias obtida com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', format: 'uuid' },
                      name: { type: 'string' },
                      createdAt: { type: 'string' },
                      updatedAt: { type: 'string' },
                      deletedAt: { type: 'string', nullable: true },
                      category_id: { type: 'string', format: 'uuid' },
                    },
                    required: ['id', 'name', 'category_id'],
                  },
                },
              },
            },
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
    },
    '/subcategories/{subcategoryID}': {
      get: {
        summary: 'Obter uma subcategoria pelo ID',
        description: 'Obtém uma subcategoria pelo ID fornecido',
        tags: ['Subcategorias'],
        parameters: [
          {
            name: 'subcategoryID',
            in: 'path',
            required: true,
            description: 'ID da subcategoria a ser obtida',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        responses: {
          200: {
            description: 'Subcategoria obtida com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' },
                    deletedAt: { type: 'string', nullable: true },
                    category_id: { type: 'string', format: 'uuid' },
                  },
                  required: ['id', 'name', 'category_id'],
                },
              },
            },
          },
          400: {
            description: 'ID da subcategoria inválido',
          },
          404: {
            description: 'Subcategoria não encontrada',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
      put: {
        summary: 'Atualizar uma subcategoria pelo ID',
        description: 'Atualiza uma subcategoria pelo ID fornecido',
        tags: ['Subcategorias'],
        parameters: [
          {
            name: 'subcategoryID',
            in: 'path',
            required: true,
            description: 'ID da subcategoria a ser atualizada',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', default: 'teste' },
                },
                required: ['name'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Subcategoria atualizada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' },
                    deletedAt: { type: 'string', nullable: true },
                    category_id: { type: 'string', format: 'uuid' },
                  },
                  required: ['id', 'name', 'description', 'type'],
                },
              },
            },
          },
          400: {
            description: 'Requisição inválida',
          },
          404: {
            description: 'Subcategoria não encontrada',
          },
          409: {
            description: 'Conflito - o nome da subcategoria já existe',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
      delete: {
        summary: 'Remover uma subcategoria pelo ID',
        description: 'Remove uma subcategoria pelo ID fornecido',
        tags: ['Subcategorias'],
        parameters: [
          {
            name: 'subcategoryID',
            in: 'path',
            required: true,
            description: 'ID da subcategoria a ser removida',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        responses: {
          204: {
            description: 'Subcategoria removida com sucesso',
          },
          400: {
            description: 'ID da subcategoria inválido',
          },
          404: {
            description: 'Subcategoria não encontrada',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
    },
    '/categories': {
      post: {
        summary: 'Criar uma nova categoria',
        description: 'Cria uma nova categoria com os dados fornecidos',
        tags: ['Categorias'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'e93ca3be-6e4f-425f-a954-4a9ed5bee052',
                  },
                  description: { type: 'string' },
                  isBrand: { type: 'boolean' },
                },
                required: ['name'],
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Categoria criada com sucesso',
          },
          400: {
            description: 'Requisição inválida',
          },
          409: {
            description: 'Categoria já existe',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
      get: {
        summary: 'Listar todas as categorias',
        description: 'Retorna uma lista de todas as categorias',
        tags: ['Categorias'],
        responses: {
          200: {
            description: 'Lista de categorias retornada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      format: 'uuid',
                      description: 'ID único da categoria',
                    },
                    name: {
                      type: 'string',
                      description: 'Nome da categoria',
                    },
                    description: {
                      type: 'string',
                      description: 'Descrição da categoria',
                    },
                    isBrand: {
                      type: 'boolean',
                      description: 'Se é uma categoria de marca',
                    },
                    createdAt: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Data e hora de criação da categoria',
                    },
                    updatedAt: {
                      type: 'string',
                      format: 'date-time',
                      description:
                        'Data e hora da última atualização da categoria',
                    },
                    deletedAt: {
                      type: ['string', 'null'],
                      format: 'date-time',
                      description:
                        'Data e hora de exclusão da categoria (se aplicável)',
                    },
                    subcategories: {
                      type: 'array',
                      description:
                        'Array de sub-categorias associados à categoria',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID único da subcategoria',
                          },
                          name: {
                            type: 'string',
                            description: 'Nome do subcategoria',
                          },
                          description: {
                            type: 'string',
                            description: 'Descrição da subcategoria',
                          },
                          isBrand: {
                            type: 'boolean',
                            description: 'Se a subcategoria é de marca',
                          },
                        },
                        required: ['id', 'name', 'description', 'isBrand'],
                      },
                    },
                  },
                  required: [
                    'id',
                    'name',
                    'description',
                    'isBrand',
                    'createdAt',
                    'updatedAt',
                    'subcategories',
                  ],
                },
                example: {
                  id: 'f3e8cd2e-f640-4949-a43f-a337adbe3d91',
                  name: 'Categoria Exemplo',
                  description: 'Esta é uma categoria de exemplo',
                  isBrand: false,
                  createdAt: '2040-03-17T01:06:05.170Z',
                  updatedAt: '2024-05-30T00:22:23.853Z',
                  deletedAt: null,
                  subcategories: [
                    {
                      id: '95ac318f-7090-4905-96cc-c56d406a9536',
                      name: 'string',
                      createdAt: '2024-04-20T00:12:02.699Z',
                      updatedAt: '2024-04-20T00:12:02.699Z',
                      deletedAt: null,
                      category_id: 'b1475cc6-750f-4dc1-8d48-21f8b8216f3f',
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: 'Requisição inválida',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
    },
    '/categories/{categoryID}': {
      get: {
        summary: 'Obter uma categoria específica pelo ID',
        description:
          'Retorna uma categoria específica com base no ID fornecido',
        tags: ['Categorias'],
        parameters: [
          {
            name: 'categoryID',
            in: 'path',
            required: true,
            description: 'ID da categoria a ser obtida',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Categoria retornada com sucesso',
          },
          400: {
            description: 'ID de categoria inválido',
          },
          404: {
            description: 'Categoria não encontrada',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
      put: {
        summary: 'Atualizar uma categoria específica',
        description:
          'Atualiza uma categoria específica com base no ID fornecido',
        tags: ['Categorias'],
        parameters: [
          {
            name: 'categoryID',
            in: 'path',
            required: true,
            description: 'ID da categoria a ser atualizada',
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  isBrand: { type: 'boolean' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Categoria atualizada com sucesso',
          },
          400: {
            description: 'Requisição inválida',
          },
          404: {
            description: 'Categoria não encontrada',
          },
          409: {
            description: 'Categoria já existe',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
      delete: {
        summary: 'Excluir uma categoria específica',
        description: 'Exclui uma categoria específica com base no ID fornecido',
        tags: ['Categorias'],
        parameters: [
          {
            name: 'categoryID',
            in: 'path',
            required: true,
            description: 'ID da categoria a ser excluída',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          204: {
            description: 'Categoria excluída com sucesso',
          },
          400: {
            description: 'ID de categoria inválido',
          },
          404: {
            description: 'Categoria não encontrada',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
    },
    '/orders': {
      post: {
        summary: 'Criar pedido',
        description: 'Cria um novo pedido com os dados fornecidos',
        tags: ['Pedidos'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  total: { type: 'string' },
                  userID: { type: 'string' },
                  products: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        quantity: { type: 'integer' },
                      },
                      required: ['id', 'quantity'],
                    },
                  },
                },
                required: ['total', 'userID', 'products'],
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Pedido criado com sucesso',
          },
          400: {
            description: 'Requisição inválida',
          },
          404: {
            description: 'Usuário ou produto não encontrado',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
    },
    '/orders/{orderID}': {
      get: {
        summary: 'Obtém um pedido específico',
        description: 'Retorna um pedido específico com base no ID fornecido',
        tags: ['Pedidos'],
        parameters: [
          {
            name: 'orderID',
            in: 'path',
            required: true,
            description: 'ID da ordem a ser obtida',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Ordem retornada com sucesso',
          },
          400: {
            description: 'ID de Ordem inválido',
          },
          404: {
            description: 'Ordem não encontrada',
          },
          500: {
            description: 'Erro interno do servidor',
          },
        },
      },
    },
  },
}
