import * as React from 'react'
import { Button, StyleSheet, SafeAreaView, FlatList, Text, View } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import WorkoutCard from '../components/WorkoutCard'
import { WorkoutService } from '../services/WorkoutService'
import IWorkoutData from '../types/Workout'

const RecentInProgressWorkout = () => {
  const isFocused = useIsFocused()
  const [workouts, setWorkouts] = React.useState<Array<IWorkoutData>>([])

  React.useEffect(() => {
    getWorkouts()
  }, [isFocused])

  const getWorkouts = () => {
    WorkoutService.getAll().then((res: any) => {
      const w = res.data.workouts
        .filter((w: IWorkoutData) => w.in_progress)
        .sort(
          (a: IWorkoutData, b: IWorkoutData) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
      setWorkouts(w)
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

export default function HomeScreen() {
  const navigation = useNavigation()
  const routeNewWorkout = (id: string) => {
    navigation.navigate('WorkoutScreen', { id })
  }

  const startNewWorkout = () => {
    WorkoutService.createWorkout().then(({ data }: any) => {
      routeNewWorkout(data.workout.id)
    })
  }

  return (
    <View style={styles.container}>
      <Button title='Start new workout' onPress={startNewWorkout} />
      <Text style={styles.title}>Home</Text>
      <RecentInProgressWorkout />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
