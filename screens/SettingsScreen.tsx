import React from 'react'
import { Button, StyleSheet, TextInput, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'

import { AuthService } from '../services/AuthService'
import { useAuth } from '../hooks/AuthContext'

const LoginForm = () => {
  const navigation = useNavigation()

  const { dispatch } = useAuth()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const login = () => {
    AuthService.login({ email, password }).then(() => {
      dispatch({ type: 'login' })
      navigation.navigate('History')
    })
  }

  return (
    <SafeAreaView>
      <Text>{email}</Text>
      <TextInput style={styles.input} placeholder='Email' onChangeText={setEmail} value={email} />
      <TextInput
        style={styles.input}
        placeholder='Password'
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <Button title='Login' onPress={login} />
    </SafeAreaView>
  )
}

export default function SettingsScreen() {
  const { state, dispatch } = useAuth()
  return (
    <View style={styles.container}>
      {state.auth ? (
        <Button title='logout' onPress={() => dispatch({ type: 'logout' })} />
      ) : (
        <LoginForm />
      )}
      <Text style={styles.title}>{JSON.stringify(state)}</Text>
      <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
      <EditScreenInfo path='/screens/TabTwoScreen.tsx' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})
