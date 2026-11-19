// Prefijo del código de cada tarea (KT-1, KT-2, ...).
export const TASK_KEY_PREFIX = 'KT'

export function buildTaskKey(number) {
  return `${TASK_KEY_PREFIX}-${number}`
}

// Devuelve el número de un código ("KT-7" -> 7) o 0 si no es válido.
export function parseTaskKeyNumber(key) {
  const number = Number(String(key ?? '').split('-')[1])
  return Number.isInteger(number) ? number : 0
}
