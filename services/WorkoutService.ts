import http from '../http-common'
import IWorkoutData from '../types/Workout'

const endpoint = '/workouts'

const getAll = () => {
  return http.get<Array<IWorkoutData>>(`${endpoint}`)
}

const getOne = (id: string) => {
  return http.get<IWorkoutData>(`${endpoint}/${id}`)
}

const createWorkout = () => {
  return http.post(`${endpoint}`)
}

const completeWorkout = (id: string) => {
  return http.patch(`${endpoint}/${id}`, { in_progress: false })
}

const resumeWorkout = (id: string) => {
  return http.patch(`${endpoint}/${id}`, { in_progress: true })
}

const deleteWorkout = (id: string) => {
  return http.delete(`${endpoint}/${id}`)
}

export const WorkoutService = {
  getAll,
  getOne,
  createWorkout,
  completeWorkout,
  resumeWorkout,
  deleteWorkout,
}
