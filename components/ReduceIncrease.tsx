import * as React from 'react'
import { Button, StyleSheet, View, Text } from 'react-native'

interface PropTypes {
  increase: Function
  reduce: Function
  value: Number
}

export default function ReduceIncrease({ increase, reduce, value }: PropTypes) {
  return (
    <View style={styles.editInputContainer}>
      <Button title='-' onPress={() => reduce()} disabled={value <= 1} />
      <Text>{value}</Text>
      <Button title='+' onPress={() => increase()} />
    </View>
  )
}

const styles = StyleSheet.create({
  editInputContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
})
