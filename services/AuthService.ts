import http from '../http-common'
import { setStoredToken, getStoredToken } from '../utils/auth-storage'

const login_endpoint = 'tokens/authentication'

const login = async (params: { email: string; password: string }) => {
  delete http.defaults.headers.common['Authorization']
  return http.post(login_endpoint, params).then(async ({ data }: any) => {
    try {
      console.log('login fired', data.authentication_token.token)
      setStoredToken(data.authentication_token.token)
      http.defaults.headers.common['Authorization'] = `Bearer ${data.authentication_token.token}`
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  })
}

const logout = async () => {
  return setStoredToken('')
}

export const AuthService = {
  login,
  logout,
}
