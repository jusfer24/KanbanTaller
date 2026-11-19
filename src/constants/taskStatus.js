// Estados posibles de una tarea.
export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
}

// Columnas del tablero, en el orden en que se muestran.
export const COLUMNS = [
  { status: TASK_STATUS.PENDING, label: 'Pendiente' },
  { status: TASK_STATUS.IN_PROGRESS, label: 'En progreso' },
  { status: TASK_STATUS.DONE, label: 'Completado' },
]
