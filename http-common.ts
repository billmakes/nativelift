import axios from 'axios'
import { getStoredToken } from './utils/auth-storage'
 
const http = axios.create({
  baseURL: 'http://localhost:4000/v1',
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
