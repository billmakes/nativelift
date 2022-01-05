import IExerciseData from './Exercise'

export default interface IWorkoutData {
  id: string,
  in_progress: boolean,
  created_at: string,
  exercises: Array<IExerciseData>
}
