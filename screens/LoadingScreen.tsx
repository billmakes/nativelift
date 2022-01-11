import * as React from 'react'
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
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
      navigate('Root', { screen: 'Home' })
    }
  }

  tryAuth()

  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' />
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
})
