export default interface IExerciseData {
  id: string,
  created_at: string,
  label: string,
  weight: number,
  sets: number,
  disabled?: boolean,
}
