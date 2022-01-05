import AsyncStorage from '@react-native-async-storage/async-storage'

const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY'

async function setStoredToken(token: string) {
  try {
    console.log('setting token', token)
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token)
    return true
  } catch (err) {
    return false
  }
}

async function getStoredToken(): Promise<string | null> {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY)
  return token 
}

export { getStoredToken, setStoredToken }
