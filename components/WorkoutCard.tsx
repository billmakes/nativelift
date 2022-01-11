import * as React from 'react'
import { Button, StyleSheet, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Card from './Card'
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
    <View style={{ marginBottom: 10 }}>
      <Card
        header={
          <>
            <View>
              <Text>{new Date(props.created_at).toLocaleDateString()}</Text>
              <Text>{props.in_progress ? 'in progress' : 'finished'}</Text>
            </View>
            <Button
              title='Details'
              onPress={() => navigation.navigate('WorkoutScreen', { id: props.id })}
            />
          </>
        }
        body={
          <>
            {exercises.length ? (
              <FlatList
                data={exercises}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Exercises {...item} />}
              />
            ) : null}
          </>
        }
      />
    </View>
  )
}

export default WorkoutCard
