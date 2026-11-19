// Tarjeta de tarea: prioridad, etiqueta, título, descripción, código, fecha y menú de acciones.
import { useState } from 'react'
import { getPriority, TASK_PRIORITY } from '../../constants/taskPriority.js'
import { TASK_STATUS } from '../../constants/taskStatus.js'
import TaskMenu from '../TaskMenu/TaskMenu.jsx'
import styles from './TaskCard.module.css'

const PRIORITY_CLASS = {
  [TASK_PRIORITY.HIGH]: styles.high,
  [TASK_PRIORITY.MEDIUM]: styles.medium,
  [TASK_PRIORITY.LOW]: styles.low,
}

const dateFormat = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short' })

function formatDate(isoDate) {
  const date = new Date(isoDate)
  return Number.isNaN(date.getTime()) ? '' : dateFormat.format(date)
}

function TaskCard({ task, onEdit, onDelete, onMove }) {
  const [isDragging, setIsDragging] = useState(false)
  const priority = getPriority(task.priority)
  const isDone = task.status === TASK_STATUS.DONE

  function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', task.id)
    event.dataTransfer.effectAllowed = 'move'
    // Se marca después de que el navegador capture la imagen de arrastre,
    // para que la tarjeta que se arrastra se vea normal y quede un hueco en su lugar.
    setTimeout(() => setIsDragging(true), 0)
  }

  const className = [styles.card, isDone && styles.done, isDragging && styles.dragging]
    .filter(Boolean)
    .join(' ')

  return (
    <article
      className={className}
      data-status={task.status}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={() => setIsDragging(false)}
    >
      <div className={styles.top}>
        <div className={styles.badges}>
          <span className={`${styles.priority} ${PRIORITY_CLASS[priority.value]}`}>
            {priority.badge}
          </span>
          {task.label && <span className={styles.label}>{task.label}</span>}
        </div>

        <div className={styles.menuSlot}>
          <TaskMenu task={task} onEdit={onEdit} onDelete={onDelete} onMove={onMove} />
        </div>
      </div>

      <h3 className={styles.title}>{task.title}</h3>

      {task.description && <p className={styles.description}>{task.description}</p>}

      <div className={styles.footer}>
        <span className={styles.key}>{task.key}</span>
        <span className={styles.date}>{formatDate(task.createdAt)}</span>
      </div>
    </article>
  )
}

export default TaskCard
