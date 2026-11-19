// Utilidades para leer y guardar datos en localStorage.
const TASKS_KEY = 'kanban-taller:tasks'
const NEXT_NUMBER_KEY = 'kanban-taller:next-task-number'
const PROJECTS_KEY = 'kanban-taller:projects'
const CURRENT_PROJECT_KEY = 'kanban-taller:current-project'

function read(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return value ?? fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Si el almacenamiento no está disponible o está lleno, se ignora.
  }
}

export function loadTasks() {
  const data = read(TASKS_KEY, [])
  return Array.isArray(data) ? data : []
}

export function saveTasks(tasks) {
  write(TASKS_KEY, tasks)
}

// Siguiente número para el código de tarea (KT-n). Nunca se reutiliza.
export function loadNextNumber() {
  const value = read(NEXT_NUMBER_KEY, 1)
  return Number.isInteger(value) && value > 0 ? value : 1
}

export function saveNextNumber(number) {
  write(NEXT_NUMBER_KEY, number)
}

export function loadProjects() {
  const data = read(PROJECTS_KEY, [])
  return Array.isArray(data) ? data : []
}

export function saveProjects(projects) {
  write(PROJECTS_KEY, projects)
}

export function loadCurrentProjectId() {
  return read(CURRENT_PROJECT_KEY, null)
}

export function saveCurrentProjectId(id) {
  write(CURRENT_PROJECT_KEY, id)
}
