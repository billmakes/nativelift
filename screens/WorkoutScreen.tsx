import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { Button, Pressable } from 'react-native'
import { WorkoutService } from '../services/WorkoutService'
import { ExerciseService } from '../services/ExerciseService'
import IWorkoutData from '../types/Workout'
import IExerciseData from '../types/Exercise'
import { Text, View } from '../components/Themed'
import ExerciseCard from '../components/ExerciseCard'

function WorkoutScreen({ route, navigation }: any) {
  const { id } = route.params
  const [workout, setWorkout] = React.useState<IWorkoutData>()
  const [exercises, setExercises] = React.useState<Array<IExerciseData>>([])

  React.useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    getWorkout()
    getExercises()
  }

  const getWorkout = () => {
    WorkoutService.getOne(id).then((res: any) => {
      console.log(res.data)
      setWorkout(res.data.workout)
      navigation.setOptions({
        title: new Date(res?.data?.workout?.created_at).toLocaleDateString(),
        headerTitleAlign: 'center',
        headerRight: () => (
          <View style={{ margin: 5 }}>
            <Button
              title={res.data.workout.in_progress ? 'Complete' : 'Edit'}
              onPress={() => console.log('finish/resume workout')}
            />
          </View>
        ),
      })
      return res.data.workout
    })
  }

  const getExercises = () => {
    ExerciseService.getAll(id).then((res: any) => {
      console.log(res.data)
      setExercises(res.data.exercises)
      return res.data.exercises
    })
  }

  const updateWorkout = () => {
    if (workout && workout.in_progress) {
      WorkoutService.completeWorkout(id).then(() => {
        setWorkout({ ...workout, in_progress: !workout.in_progress })
        // routeWorkouts()
      })
    } else {
      WorkoutService.resumeWorkout(id).then(() => {
        if (workout) {
          setWorkout({ ...workout, in_progress: !workout.in_progress })
        }
      })
    }
  }

  const deleteWorkout = () => {
    WorkoutService.deleteWorkout(id).then(() => {
      //routeWorkouts()
    })
  }

  if (workout) {
    return (
      <SafeAreaView style={styles.container}>
        <div>
          <div className='d-flex justify-content-between align-items-center mb-2'>
            <h5>{new Date(workout.created_at).toLocaleDateString()}</h5>
            <h5>{workout.in_progress ? 'IN PROGRESS' : 'NOT IN PROGRESS'}</h5>
            <Button
              title='Add Exercise'
              onPress={() => console.log('route to add exercise')}
              disabled={!workout.in_progress}
            />
          </div>
          <ul className='list-group'>
            {exercises &&
              exercises.map((exercise, index) => (
                <li key={index}>
                  <ExerciseCard {...exercise} />
                </li>
              ))}
          </ul>
          <div className='d-flex justify-content-center'>
            <Button
              title='Delete Exercise'
              onPress={() => console.log('delete exercise')}
              disabled={!workout.in_progress}
            />
          </div>
        </div>
      </SafeAreaView>
    )
  } else {
    return <h1>Error</h1>
  }
}

export default WorkoutScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
