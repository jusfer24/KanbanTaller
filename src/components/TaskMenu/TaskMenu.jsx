// Menú "⋮" de una tarjeta: mover a otro estado, editar y eliminar.
import { useEffect, useRef, useState } from 'react'
import { COLUMNS } from '../../constants/taskStatus.js'
import styles from './TaskMenu.module.css'

function TaskMenu({ task, onEdit, onDelete, onMove }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  // Cerrar al hacer clic fuera o al pulsar Escape.
  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event) {
      if (!menuRef.current?.contains(event.target)) setIsOpen(false)
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  function run(action) {
    setIsOpen(false)
    action()
  }

  function handleDelete() {
    if (window.confirm(`¿Eliminar la tarea ${task.key} "${task.title}"?`)) {
      onDelete(task.id)
    }
  }

  const otherColumns = COLUMNS.filter((column) => column.status !== task.status)

  return (
    <div className={`${styles.menu} ${isOpen ? styles.open : ''}`} ref={menuRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={`Acciones de ${task.key}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        ⋮
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="menu">
          <p className={styles.groupLabel}>Mover a</p>
          {otherColumns.map((column) => (
            <button
              key={column.status}
              type="button"
              role="menuitem"
              className={styles.item}
              onClick={() => run(() => onMove(task.id, column.status))}
            >
              {column.label}
            </button>
          ))}

          <hr className={styles.divider} />

          <button
            type="button"
            role="menuitem"
            className={styles.item}
            onClick={() => run(() => onEdit(task))}
          >
            Editar
          </button>
          <button
            type="button"
            role="menuitem"
            className={`${styles.item} ${styles.danger}`}
            onClick={() => run(handleDelete)}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  )
}

export default TaskMenu
