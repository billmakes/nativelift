import axios from 'axios'
import { getStoredToken } from './utils/auth-storage'

const dev = 'http://localhost:4000/v1'
const prod = 'https://liftapi.billmakes.com/v1' 

const http = axios.create({
  baseURL: prod,
  headers: {
    'Content-Type': 'application/json',
  },
})

async function fetchToken() {
  const token = await getStoredToken() 
  if (token) {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

fetchToken()

export default http
