import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { useReducer } from 'react'
import { Button, Platform, StyleSheet, TextInput } from 'react-native'

import { Text, View } from '../components/Themed'
import { ExerciseService, ExerciseOptions } from '../services/ExerciseService'
import Card from '../components/Card'
import ReduceIncrease from '../components/ReduceIncrease'

type ActionType = {
  type: string
  payload: any
}

function reducer(state: ExerciseOptions, action: ActionType) {
  switch (action.type) {
    case 'setWeight':
      return { ...state, weight: action.payload }
    case 'setSets':
      return { ...state, sets: action.payload }
    case 'setLabel':
      return { ...state, label: action.payload }
    default:
      throw new Error()
  }
}

function usePrevious(value: any) {
  const ref = React.useRef()
  React.useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export default function AddExerciseModalScreen({ navigation, route }: any) {
  const initialState = {
    weight: 65,
    sets: 3,
    label: '',
  }
  const [formState, dispatch] = useReducer(reducer, initialState)
  const params: Partial<ExerciseOptions> = {}

  const addExercise = () => {
    if (route?.params?.id)
      ExerciseService.create(route.params.id, formState).then(() => {
        navigation.goBack()
      })
  }

  const CardEditing = () => {
    return (
      <Card
        header={
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title='Done' onPress={addExercise} />
          </View>
        }
        body={
          <>
            <Text style={styles.header}>Label</Text>
            <TextInput
              style={styles.input}
              placeholder='Exercise label'
              onChangeText={(e) => dispatch({ type: 'setLabel', payload: e })}
              value={formState.label}
            />
            <Text style={styles.header}>Weight</Text>
            <ReduceIncrease
              reduce={() => dispatch({ type: 'setWeight', payload: formState.weight - 5 })}
              increase={() => dispatch({ type: 'setWeight', payload: formState.weight + 5 })}
              value={formState.weight}
            />
            <Text style={styles.header}>Sets</Text>
            <ReduceIncrease
              reduce={() => dispatch({ type: 'setSets', payload: formState.sets - 1 })}
              increase={() => dispatch({ type: 'setSets', payload: formState.sets + 1 })}
              value={formState.sets}
            />
            <View
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
            ></View>
          </>
        }
      />
    )
  }

  return (
    <View style={styles.container}>
      {CardEditing()}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})
