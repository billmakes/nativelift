import * as React from 'react'
import { useState, useReducer } from 'react'
import { Button, StyleSheet, View, Text, TextInput } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { ExerciseService, ExerciseOptions } from '../services/ExerciseService'
import IExerciseData from '../types/Exercise'
import Card from './Card'
import ReduceIncrease from './ReduceIncrease'
import Checkbox from './Checkbox'

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

interface PropTypes {
  exercise: IExerciseData
  handleDelete: Function
}

export default function ExerciseCard(props: PropTypes) {
  const { exercise, handleDelete } = props

  const route = useRoute()
  const [editing, setEditing] = useState(false)
  const [completed, setCompleted] = useState(false)

  const initialState = {
    weight: exercise.weight,
    sets: exercise.sets,
    label: exercise.label,
  }

  const [exerciseState, setExerciseState] = useState(initialState)
  const [formState, dispatch] = useReducer(reducer, initialState)

  type setDataType = { checked: boolean; key: string }

  function createSetsData() {
    let setsData: setDataType[] = []
    for (let i = 0; i < formState.sets; i++) {
      setsData.push({ checked: false, key: 'set' + i })
    }
    return setsData
  }

  createSetsData()

  const [sets, setSets] = useState(createSetsData())

  function computeCompleted() {
    setCompleted(sets.every((set) => set.checked))
  }

  const updateExercise = (params: Partial<ExerciseOptions>) => {
    if (route?.params?.id) ExerciseService.update(route.params.id, exercise.id, params)
  }

  function editExerciseHandler() {
    if (editing) {
      setEditing(!editing)
      setExerciseState(formState)
      setCompleted(false)
      setSets(createSetsData())
      if (formState.weight !== prevState.weight) params.weight = formState.weight
      if (formState.sets !== prevState.sets) params.sets = formState.sets
      if (formState.label !== prevState.label) params.label = formState.label
      if (Object.keys(params).length) {
        updateExercise(params)
      }
    } else {
      setEditing(!editing)
    }
  }

  const params: Partial<ExerciseOptions> = {}

  const prevState: any = usePrevious(formState)

  const CardEditing = () => {
    return (
      <Card
        header={
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title='Delete' onPress={() => handleDelete(exercise.id)} />
            <Button title='Done' onPress={editExerciseHandler} />
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

  const CardBody = () => {
    return (
      <View>
        <Card
          header={
            <>
              <Text style={styles.header}>{exerciseState.label}</Text>
              <Button title={editing ? 'Save' : 'Edit'} onPress={editExerciseHandler} />
            </>
          }
          body={
            <>
              <Text style={styles.header}>{exerciseState.weight}lbs</Text>
              <Text>{completed ? 'done' : ''}</Text>
              <View style={styles.checkboxContainer}>
                {sets.map((set) => (
                  <Checkbox
                    key={set.key}
                    style={styles.checkbox}
                    value={set.checked}
                    onChange={(val: boolean) => {
                      set.checked = val
                      setSets([...sets])
                      computeCompleted()
                    }}
                    disabled={exercise.disabled}
                  />
                ))}
              </View>
            </>
          }
        />
      </View>
    )
  }

  return <View style={{ marginBottom: 10 }}>{editing ? CardEditing() : CardBody()}</View>
}

const styles = StyleSheet.create({
  checkboxContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInputContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkbox: {
    margin: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})
