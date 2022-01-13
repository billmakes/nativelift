import React from 'react'
import { Button, Text, View, FlatList, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { WorkoutService } from '../services/WorkoutService'
import { ExerciseService } from '../services/ExerciseService'
import IWorkoutData from '../types/Workout'
import IExerciseData from '../types/Exercise'
import ExerciseCard from '../components/ExerciseCard'
import { SafeAreaView } from 'react-native-safe-area-context'

function WorkoutScreen({ route, navigation }: any) {
  const isFocused = useIsFocused()
  const { id } = route.params
  const [workout, setWorkout] = React.useState<IWorkoutData>()
  const [exercises, setExercises] = React.useState<Array<IExerciseData>>([])

  React.useEffect(() => {
    fetchData()
  }, [isFocused, workout?.in_progress])

  const fetchData = () => {
    getWorkout()
    getExercises()
  }

  const updateWorkout = () => {
    if (workout && workout.in_progress) {
      WorkoutService.completeWorkout(id).then(() => {
        setWorkout({ ...workout, in_progress: false })
        navigateHome()
      })
    } else {
      WorkoutService.resumeWorkout(id).then(() => {
        if (workout) {
          setWorkout({ ...workout, in_progress: true })
        }
      })
    }
  }

  const getWorkout = () => {
    WorkoutService.getOne(id).then((res: any) => {
      setWorkout(res.data.workout)
      navigation.setOptions({
        title: new Date(res?.data?.workout?.created_at).toLocaleDateString(),
        headerTitleAlign: 'center',
        headerRight: () => (
          <View style={{ margin: 5 }}>
            <Button
              title={res.data.workout.in_progress ? 'Finish' : 'Edit'}
              onPress={() => updateWorkout()}
            />
          </View>
        ),
      })
      return res.data.workout
    })
  }

  const getExercises = () => {
    ExerciseService.getAll(id).then((res: any) => {
      setExercises(res.data.exercises)
      return res.data.exercises
    })
  }

  const deleteExercise = (id: string) => {
    if (route?.params?.id)
      ExerciseService.deleteExercise(route.params.id, id).then(() => {
        setExercises(exercises.filter((e) => e.id !== id))
      })
  }

  const navigateHome = () => {
    navigation.navigate('Home')
  }

  const navigateAddExerciseModal = () => {
    navigation.navigate('AddExerciseModal', { id })
  }

  const deleteWorkout = () => {
    WorkoutService.deleteWorkout(id).then(() => {
      navigateHome()
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      {workout ? (
        <>
          <View>
            <Text>{new Date(workout.created_at).toLocaleDateString()}</Text>
            <Text>{workout.in_progress ? 'IN PROGRESS' : 'NOT IN PROGRESS'}</Text>
            <Button
              title='Add Exercise'
              onPress={navigateAddExerciseModal}
              disabled={!workout.in_progress}
            />
          </View>
          <View>
            {exercises.length ? (
              <FlatList
                data={exercises}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ExerciseCard exercise={item} handleDelete={deleteExercise} />
                )}
              />
            ) : null}
          </View>
          <View>
            <Button
              title='Delete Workout'
              onPress={deleteWorkout}
              disabled={!workout.in_progress}
            />
          </View>
        </>
      ) : (
        <Text>Loading</Text>
      )}
    </SafeAreaView>
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

export default WorkoutScreen
