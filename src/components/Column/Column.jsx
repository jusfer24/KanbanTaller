// Columna: muestra las tareas de un estado, recibe tareas arrastradas
// y permite agregar una tarea directamente en este estado.
import { useState } from 'react'
import TaskCard from '../TaskCard/TaskCard.jsx'
import styles from './Column.module.css'

function Column({ status, label, tasks, isFiltering, onAdd, onEdit, onDelete, onMove }) {
  const [isDragOver, setIsDragOver] = useState(false)

  function handleDragOver(event) {
    event.preventDefault() // Necesario para permitir soltar.
    event.dataTransfer.dropEffect = 'move'
    if (!isDragOver) setIsDragOver(true)
  }

  function handleDragLeave(event) {
    // Ignorar cuando el cursor solo pasa a un elemento hijo de la columna.
    if (!event.currentTarget.contains(event.relatedTarget)) setIsDragOver(false)
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragOver(false)
    const taskId = event.dataTransfer.getData('text/plain')
    if (taskId) onMove(taskId, status)
  }

  return (
    <section
      className={`${styles.column} ${isDragOver ? styles.dragOver : ''}`}
      data-status={status}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <header className={styles.header}>
        <h2 className={styles.title}>{label}</h2>
        <span className={styles.count}>{tasks.length}</span>
      </header>

      <div className={styles.list}>
        {tasks.length === 0 ? (
          <p className={styles.empty}>
            {isFiltering ? 'Sin resultados' : 'Arrastra tareas aquí'}
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))
        )}
      </div>

      <button type="button" className={styles.addButton} onClick={() => onAdd(status)}>
        Agregar tarea
        <span className={styles.addIcon} aria-hidden="true">
          +
        </span>
      </button>
    </section>
  )
}

export default Column
