import * as React from 'react'
import { Button, StyleSheet, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Text, View } from './Themed'
import IWorkoutData from '../types/Workout'
import IExerciseData from '../types/Exercise'

const Exercises = (e: IExerciseData) => {
  return <Text key={e.id}>{e.label}</Text>
}

function WorkoutCard(props: IWorkoutData) {
  const { exercises } = props
  const navigation = useNavigation()
  return (
    <View style={styles.cardContainer}>
      <Text>Workout</Text>
      <View>
        <Text>{new Date(props.created_at).toLocaleDateString()}</Text>
        <Text>{props.id}</Text>
        <Text>{props.in_progress ? 'in progress' : 'not started'}</Text>
        <View>
          <View>
            {exercises.length ? (
              <FlatList
                data={exercises}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Exercises {...item} />}
              />
            ) : null}
          </View>
          <Button
            title='Details'
            onPress={() => navigation.navigate('WorkoutScreen', { id: props.id })}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
  },
})

export default WorkoutCard
