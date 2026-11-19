// Prioridades de una tarea, de mayor a menor.
export const TASK_PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
}

export const DEFAULT_PRIORITY = TASK_PRIORITY.MEDIUM

export const PRIORITIES = [
  { value: TASK_PRIORITY.HIGH, label: 'Alta', badge: 'Prioridad alta' },
  { value: TASK_PRIORITY.MEDIUM, label: 'Media', badge: 'Prioridad media' },
  { value: TASK_PRIORITY.LOW, label: 'Baja', badge: 'Prioridad baja' },
]

export function getPriority(value) {
  return PRIORITIES.find((p) => p.value === value) ?? PRIORITIES[1]
}
