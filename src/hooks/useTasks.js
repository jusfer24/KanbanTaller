// Hook con la lógica de tareas: crear, editar, eliminar y mover entre estados.
import { useEffect, useState } from 'react'
import { DEFAULT_PROJECT } from '../constants/project.js'
import { buildTaskKey, parseTaskKeyNumber } from '../constants/taskKey.js'
import { DEFAULT_PRIORITY } from '../constants/taskPriority.js'
import { TASK_STATUS } from '../constants/taskStatus.js'
import { loadNextNumber, loadTasks, saveNextNumber, saveTasks } from '../utils/storage.js'

// Carga las tareas guardadas y completa los campos que falten
// (tareas creadas antes de existir el proyecto, el código, la prioridad o la etiqueta).
function loadInitialState() {
  const stored = loadTasks()
  const maxNumber = Math.max(0, ...stored.map((task) => parseTaskKeyNumber(task.key)))
  let nextNumber = Math.max(loadNextNumber(), maxNumber + 1)

  const tasks = stored.map((task) => ({
    projectId: DEFAULT_PROJECT.id,
    priority: DEFAULT_PRIORITY,
    label: '',
    ...task,
    key: task.key ?? buildTaskKey(nextNumber++),
  }))

  return { tasks, nextNumber }
}

export function useTasks() {
  const [initial] = useState(loadInitialState)
  const [tasks, setTasks] = useState(initial.tasks)
  const [nextNumber, setNextNumber] = useState(initial.nextNumber)

  // Guarda en localStorage cada vez que cambian los datos.
  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  useEffect(() => {
    saveNextNumber(nextNumber)
  }, [nextNumber])

  function addTask({
    projectId,
    title,
    description,
    priority,
    label,
    status = TASK_STATUS.PENDING,
  }) {
    const newTask = {
      id: crypto.randomUUID(),
      projectId,
      key: buildTaskKey(nextNumber),
      title,
      description,
      priority,
      label,
      status,
      createdAt: new Date().toISOString(),
    }
    setNextNumber(nextNumber + 1)
    setTasks((prev) => [...prev, newTask])
  }

  function updateTask(id, changes) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...changes } : task)),
    )
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  function moveTask(id, status) {
    updateTask(id, { status })
  }

  // Elimina todas las tareas de un proyecto (al eliminar el proyecto).
  function deleteTasksByProject(projectId) {
    setTasks((prev) => prev.filter((task) => task.projectId !== projectId))
  }

  return { tasks, addTask, updateTask, deleteTask, moveTask, deleteTasksByProject }
}
