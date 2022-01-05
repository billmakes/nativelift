import http from '../http-common'
import IExerciseData from '../types/Exercise'

export type ExerciseOptions = { label: string; weight: number; sets: number }

const endpoint = (workout_id: string) => `/workouts/${workout_id}/exercises`

const getAll = (workout_id: string) => {
  return http.get<Array<IExerciseData>>(`${endpoint(workout_id)}`)
}

const getOne = (workout_id: string, id: string) => {
  return http.get<IExerciseData>(`${endpoint(workout_id)}/${id}`)
}

const create = (workout_id: string, params: ExerciseOptions) => {
  return http.post<IExerciseData>(`${endpoint(workout_id)}`, params)
}

const update = (workout_id: string, id: string, params: Partial<ExerciseOptions>) => {
  return http.patch<IExerciseData>(`${endpoint(workout_id)}/${id}`, params)
}

const deleteExercise = (workout_id: string, id: string) => {
  return http.delete(`${endpoint(workout_id)}/${id}`)
}

export const ExerciseService = {
  getAll,
  getOne,
  update,
  create,
  deleteExercise,
}
