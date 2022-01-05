import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View } from '../components/Themed'

import { RootStackScreenProps } from '../types'

import { useAuth } from '../hooks/AuthContext'
import { getStoredToken } from '../utils/auth-storage'

export default function LoadingScreen({
  navigation: { navigate },
}: RootStackScreenProps<'Loading'>) {
  const {
    state: { auth },
  } = useAuth()

  async function tryAuth() {
    const token = await getStoredToken()

    if (!token && !auth) {
      navigate('Root', { screen: 'Settings' })
    } else {
      navigate('Root', { screen: 'History' })
    }
  }

  tryAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loading!!!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
})
