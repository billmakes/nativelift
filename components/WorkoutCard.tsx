import * as React from 'react'
import { Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import IWorkoutData from '../types/Workout'
import IExerciseData from '../types/Exercise'

function WorkoutCard(props: IWorkoutData) {
  const navigation = useNavigation()
  return (
    <div style={{ width: '18rem', margin: '0.5rem' }}>
      <h1>Workout</h1>
      <div>
        {new Date(props.created_at).toLocaleDateString()}
        {props.id}
        {props.in_progress ? 'in progress' : 'not started'}
        <ul>
          {props.exercises &&
            props.exercises.map((exercise: IExerciseData) => (
              <li key={exercise.id}>{exercise.label}</li>
            ))}
        </ul>
        <div>
          <Button
            title='Details'
            onPress={() => navigation.navigate('WorkoutScreen', { id: props.id })}
          />
        </div>
      </div>
    </div>
  )
}

export default WorkoutCard
