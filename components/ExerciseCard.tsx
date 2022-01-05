import * as React from 'react'
import { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import IExerciseData from '../types/Exercise'
import Checkbox from './Checkbox'

export default function ExerciseCard(props: IExerciseData) {
  type setDataType = { checked: boolean; key: string }
  const setsData: setDataType[] = []

  for (let i = 0; i < props.sets; i++) {
    setsData.push({ checked: false, key: 'set' + i })
  }

  const [sets, setSets] = useState(setsData)
  function completed() {
    return !sets.filter((set) => !set.checked).length
  }
  return (
    <View>
      <h1>{props.label}</h1>
      <Text>{props.weight}</Text>
      <h1>{completed() && 'done'}</h1>
      <View style={styles.checkboxContainer}>
        {sets.map((set) => (
            <Checkbox
              key={set.key}
              style={styles.checkbox}
              value={set.checked}
              onChange={(val: boolean) => {
                set.checked = val
                setSets([...sets])
              }}
              disabled={props.disabled}
            />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 5,
  },
})
