import axios from 'axios'

const apiURL =
  'https://n8n.etapps.com.br/webhook/197fc207-779e-4281-a650-d4d06f568240'
const webhookKey = '9dd4dc19-d876-4ab1-8e2a-b2905a6faded'

const api = axios.create({
  baseURL: apiURL,
  headers: {
    'webhook-key': webhookKey,
    'Content-Type': 'application/json',
  },
})

export { api }
