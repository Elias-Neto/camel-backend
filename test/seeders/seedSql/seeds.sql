CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO
    public.products (
        id,
        name,
        price,
        description,
        created_at,
        updated_at,
        deleted_at,
        available
    )
VALUES
    (
        '1c047ba0-86bb-4b7b-b017-53b0de6c1b7a',
        'Fio elétrico',
        '25.50',
        'Fio elétrico de 2mm para instalações residenciais.',
        '2023-05-10 15:30:00',
        '2023-05-10 15:30:00',
        NULL,
        true
    ),
    (
        '2f8b4f55-92ec-422f-bf1f-26eb3c9e1285',
        'Tomada',
        '12.99',
        'Tomada simples de 10A, padrão brasileiro.',
        '2023-06-22 08:45:00',
        '2023-06-22 08:45:00',
        NULL,
        true
    ),
    (
        'e90d12b4-df86-4764-98f5-23c5a87b85ec',
        'Interruptor',
        '8.75',
        'Interruptor simples para lâmpadas incandescentes.',
        '2023-07-05 12:15:00',
        '2023-07-05 12:15:00',
        NULL,
        true
    ),
    (
        '8f036678-9e1d-490e-b8e2-99a005e3e4f4',
        'Lâmpada',
        '5.99',
        'Lâmpada LED de 9W, luz branca quente.',
        '2023-08-17 09:30:00',
        '2023-08-17 09:30:00',
        NULL,
        true
    ),
    (
        'f36cf787-3a8b-4737-8d81-7a89630d66b0',
        'Disjuntor',
        '35.25',
        'Disjuntor de 20A para proteção de circuitos elétricos.',
        '2023-09-01 16:20:00',
        '2023-09-01 16:20:00',
        NULL,
        true
    ),
    (
        '9b7bfefa-f197-40ad-a238-f9d1cfec3424',
        'Cabo elétrico',
        '18.75',
        'Cabo elétrico flexível de 2,5mm para instalações.',
        '2023-10-14 10:10:00',
        '2023-10-14 10:10:00',
        NULL,
        true
    ),
    (
        '8033c9e3-7a4f-44cb-a572-3948eb78a824',
        'Conector',
        '4.50',
        'Conector de emenda para cabos de energia.',
        '2023-11-25 11:45:00',
        '2023-11-25 11:45:00',
        NULL,
        true
    ),
    (
        '7b3b3c6d-9867-426f-b27c-4ff7f18145e6',
        'Extensão elétrica',
        '29.99',
        'Extensão elétrica com 3 tomadas, cabo de 3 metros.',
        '2023-12-09 13:20:00',
        '2023-12-09 13:20:00',
        NULL,
        true
    ),
    (
        'e92556cb-8637-4923-b8cc-5db05d7cf4cc',
        'Luminária',
        '42.00',
        'Luminária de mesa com LED integrado.',
        '2024-01-20 14:55:00',
        '2024-01-20 14:55:00',
        NULL,
        true
    ),
    (
        'f5e3562e-4b61-4f44-a624-29fc155b00d8',
        'Transformador',
        '55.99',
        'Transformador de 110V para 220V, 1000W.',
        '2024-02-06 17:30:00',
        '2024-02-06 17:30:00',
        NULL,
        true
    ),
    (
        '4a1e3c9d-7b0a-4e6f-8e2b-1f7d3e5c6b9a',
        'Dispositivo de Proteção contra Surtos (DPS)',
        '39.90',
        'DPS para proteção de equipamentos eletrônicos contra picos de tensão.',
        '2024-03-15 09:10:00',
        '2024-03-15 09:10:00',
        NULL,
        true
    ),
    (
        'b2e7a8f4-3e7c-4d0a-9c4e-6e8e1f2e9d3b',
        'Caixa de Passagem',
        '12.50',
        'Caixa de passagem para conexões elétricas em instalações internas.',
        '2024-04-02 14:20:00',
        '2024-04-02 14:20:00',
        NULL,
        true
    ),
    (
        'd8c9b7a6-8f6e-4e5d-9a1f-7b6c5d4e3a2d',
        'Fita Isolante',
        '3.25',
        'Fita isolante elétrica para proteção e isolamento de fios e cabos.',
        '2024-05-10 11:30:00',
        '2024-05-10 11:30:00',
        NULL,
        true
    ),
    (
        'a3b4c5d6-e7f8-9a0b-1c2d-3e4f5a6b7c8d',
        'Chave de Fenda Isolada',
        '15.99',
        'Chave de fenda com cabo isolado para trabalhos em circuitos elétricos.',
        '2024-06-22 16:45:00',
        '2024-06-22 16:45:00',
        NULL,
        true
    ),
    (
        'b8c7d6e5-f4a3-2b1e-9d8c-7a6f5e4d3c1b',
        'Plugue Macho',
        '6.75',
        'Plugue macho para conexão de aparelhos elétricos à tomada.',
        '2024-07-05 13:15:00',
        '2024-07-05 13:15:00',
        NULL,
        true
    ),
    (
        'e9d8c7b6-a5f4-3e2d-1b8c-9d7e6f5a4c3b',
        'Fusível',
        '2.50',
        'Fusível de 10A para proteção de circuitos elétricos.',
        '2024-08-17 10:30:00',
        '2024-08-17 10:30:00',
        NULL,
        true
    ),
    (
        'f3a2b1c9-8d7e-6f5a-4c3b-2e1d9a8c7b5f',
        'Caixa de Distribuição',
        '28.99',
        'Caixa de distribuição para organização de fios e cabos.',
        '2024-09-01 15:20:00',
        '2024-09-01 15:20:00',
        NULL,
        true
    ),
    (
        '9a8b7c6d-5e4f-3a2b-1c9d-8e37f6a5b4c3',
        'Sensor de Presença',
        '19.00',
        'Sensor de presença para automação de iluminação.',
        '2024-10-14 09:10:00',
        '2024-10-14 09:10:00',
        NULL,
        true
    ),
    (
        '8c7b6a5f-4d3e-2b1c-9d8e-7f6a5b4c3d21',
        'Cabo HDMI',
        '8.50',
        'Cabo HDMI de 1,5 metros para conexão de dispositivos eletrônicos.',
        '2024-11-25 10:45:00',
        '2024-11-25 10:45:00',
        NULL,
        true
    );

INSERT INTO
    public.images (
        id,
        src,
        product_id,
        category_id,
        created_at,
        updated_at,
        deleted_at
    )
VALUES
    (
        UUID_GENERATE_V4(),
        'https://img.irroba.com.br/fit-in/600x600/filters:format(webp):fill(fff):quality(80)/fluzaoco/catalog/api/fluzaoco_citelirr/646fa186b6021.jpg',
        'e90d12b4-df86-4764-98f5-23c5a87b85ec',
        NULL,
        '2023-05-10 15:30:00',
        '2023-05-10 15:30:00',
        NULL
    ),
    (
        UUID_GENERATE_V4(),
        'https://www.elektrontransformadores.com.br/imagens/tf3.png',
        'f5e3562e-4b61-4f44-a624-29fc155b00d8',
        NULL,
        '2023-05-12 15:30:00',
        '2023-05-12 15:30:00',
        NULL
    ),
    (
        UUID_GENERATE_V4(),
        'https://siemetrafo.com.br/wp-content/uploads/2021/02/transformador-a-oleo-trifasico-112-5kva.jpeg',
        'f5e3562e-4b61-4f44-a624-29fc155b00d8',
        NULL,
        '2023-05-12 15:30:00',
        '2023-05-12 15:30:00',
        NULL
    );

INSERT INTO
    public.categories (
        id,
        name,
        description,
        is_brand,
        created_at,
        updated_at,
        deleted_at
    )
VALUES
    (
        UUID_GENERATE_V4(),
        'Fios e Cabos',
        'Fios e cabos para os mais diversos usos e com toda a qualidade',
        false,
        '2024-11-25 10:45:00',
        '2024-11-25 10:45:00',
        NULL
    ),
    (
        UUID_GENERATE_V4(),
        'Segurança',
        'Tudo o que você precisa para a sua segurança em um só lugar',
        false,
        '2024-11-25 10:45:00',
        '2024-11-25 10:45:00',
        NULL
    ),
    (
        UUID_GENERATE_V4(),
        'Iluminação',
        'Aqui você encontra os mais diversos tipos de iluminações para a sua obra.',
        false,
        '2024-11-25 10:45:00',
        '2024-11-25 10:45:00',
        NULL
    );