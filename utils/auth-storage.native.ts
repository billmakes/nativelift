import { setItemAsync, getItemAsync } from 'expo-secure-store'

const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY'

async function setStoredToken(token: string) {
  try {
    await setItemAsync(AUTH_TOKEN_KEY, JSON.stringify(token))
    return true
  } catch (err) {
    return false
  }
}

async function getStoredToken(): Promise<string | null> {
  const token = await getItemAsync(AUTH_TOKEN_KEY)
  return token ? JSON.parse(token) : token
}

export { getStoredToken, setStoredToken }
