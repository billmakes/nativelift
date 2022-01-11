import React from 'react'
import { StyleSheet, SafeAreaView, FlatList } from 'react-native'

import { View } from '../components/Themed'
import { RootTabScreenProps } from '../types'

import WorkoutCard from '../components/WorkoutCard'
import { WorkoutService } from '../services/WorkoutService'
import IWorkoutData from '../types/Workout'

const Workouts = () => {
  const [workouts, setWorkouts] = React.useState<Array<IWorkoutData>>([])

  React.useEffect(() => {
    getWorkouts()
  }, [])

  const getWorkouts = () => {
    WorkoutService.getAll().then((res: any) => {
      setWorkouts(res.data.workouts)
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      {workouts.length ? (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <WorkoutCard {...item} />}
        />
      ) : null}
    </SafeAreaView>
  )
}

export default function History({ navigation }: RootTabScreenProps<'History'>) {
  return (
    <View style={styles.container}>
      <Workouts />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
