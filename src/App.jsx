import { useState } from 'react'
import styles from './App.module.css'
import Board from './components/Board/Board.jsx'
import BoardHeader from './components/BoardHeader/BoardHeader.jsx'
import ProjectForm from './components/ProjectForm/ProjectForm.jsx'
import TaskForm from './components/TaskForm/TaskForm.jsx'
import { TASK_STATUS } from './constants/taskStatus.js'
import { useProjects } from './hooks/useProjects.js'
import { useTasks } from './hooks/useTasks.js'
import { filterTasks } from './utils/search.js'

function App() {
  const { projects, currentProject, addProject, selectProject } = useProjects()
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useTasks()

  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  // Columna en la que se creará la tarea nueva.
  const [createStatus, setCreateStatus] = useState(TASK_STATUS.PENDING)
  const [query, setQuery] = useState('')

  // Solo las tareas del proyecto actual, filtradas por la búsqueda.
  const projectTasks = tasks.filter((task) => task.projectId === currentProject.id)
  const visibleTasks = filterTasks(projectTasks, query)

  function openCreateTask(status = TASK_STATUS.PENDING) {
    setEditingTask(null)
    setCreateStatus(status)
    setIsTaskFormOpen(true)
  }

  function openEditTask(task) {
    setEditingTask(task)
    setIsTaskFormOpen(true)
  }

  function closeTaskForm() {
    setIsTaskFormOpen(false)
    setEditingTask(null)
  }

  function handleTaskSubmit(data) {
    if (editingTask) {
      updateTask(editingTask.id, data)
    } else {
      addTask({ ...data, status: createStatus, projectId: currentProject.id })
    }
    closeTaskForm()
  }

  function handleProjectSubmit(name) {
    addProject(name)
    setQuery('')
    setIsProjectFormOpen(false)
  }

  function handleSelectProject(id) {
    selectProject(id)
    setQuery('')
  }

  return (
    <div className={styles.app}>
      <BoardHeader
        projects={projects}
        currentProject={currentProject}
        onSelectProject={handleSelectProject}
        onCreateProject={() => setIsProjectFormOpen(true)}
        query={query}
        onQueryChange={setQuery}
        resultCount={visibleTasks.length}
        onCreateTask={() => openCreateTask()}
      />

      <main className={styles.main}>
        <Board
          tasks={visibleTasks}
          isFiltering={query.trim() !== ''}
          onAdd={openCreateTask}
          onEdit={openEditTask}
          onDelete={deleteTask}
          onMove={moveTask}
        />
      </main>

      {/* Botón flotante para crear tarea (visible en móvil) */}
      <button
        type="button"
        className={styles.fab}
        onClick={() => openCreateTask()}
        aria-label="Crear tarea"
        title="Crear tarea"
      >
        +
      </button>

      {isTaskFormOpen && (
        <TaskForm
          initialTask={editingTask}
          status={createStatus}
          onSubmit={handleTaskSubmit}
          onCancel={closeTaskForm}
        />
      )}

      {isProjectFormOpen && (
        <ProjectForm
          onSubmit={handleProjectSubmit}
          onCancel={() => setIsProjectFormOpen(false)}
        />
      )}
    </div>
  )
}

export default App
