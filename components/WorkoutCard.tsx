import * as React from 'react'
import { Button, Text, View, StyleSheet, FlatList, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Card from './Card'
import IWorkoutData from '../types/Workout'
import IExerciseData from '../types/Exercise'

const Exercises = (e: IExerciseData) => {
  return (
    <View style={styles.exerciseItem} key={e.id}>
      <View>
        <Text>{e.label}</Text>
      </View>
      <View>
        <Text>
          {e.sets}x{e.weight}lbs
        </Text>
      </View>
    </View>
  )
}

function WorkoutCard(props: IWorkoutData) {
  const { exercises } = props
  const navigation = useNavigation()
  return (
    <View style={{ marginBottom: 10 }}>
      <Pressable onPress={() => navigation.navigate('WorkoutScreen', { id: props.id })}>
        {({ pressed }) => (
          <Card
            style={pressed ? { backgroundColor: 'rgb(225, 225, 225)' } : {}}
            header={
              <View style={styles.cardHeader}>
                <View>
                  <Text>{new Date(props.created_at).toLocaleDateString()}</Text>
                </View>
                <View>
                  <Text>{props.in_progress ? 'in progress' : 'finished'}</Text>
                </View>
              </View>
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
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exerciseItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: 'rgb(219, 219, 219)',
    borderRadius: 4,
    marginBottom: 5,
    padding: 5,
  },
})

export default WorkoutCard
