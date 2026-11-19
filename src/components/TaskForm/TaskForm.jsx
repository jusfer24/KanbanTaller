// Formulario (en ventana modal) para crear y editar tareas.
// Si recibe `initialTask`, funciona en modo edición.
import { useState } from 'react'
import { DEFAULT_PRIORITY, PRIORITIES } from '../../constants/taskPriority.js'
import { COLUMNS } from '../../constants/taskStatus.js'
import form from '../../styles/form.module.css'
import Modal from '../Modal/Modal.jsx'

function TaskForm({ initialTask, status, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialTask?.title ?? '')
  const [description, setDescription] = useState(initialTask?.description ?? '')
  const [priority, setPriority] = useState(initialTask?.priority ?? DEFAULT_PRIORITY)
  const [label, setLabel] = useState(initialTask?.label ?? '')
  const isEditing = Boolean(initialTask)
  const statusLabel = COLUMNS.find((column) => column.status === status)?.label ?? ''

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return
    onSubmit({
      title: trimmedTitle,
      description: description.trim(),
      priority,
      label: label.trim(),
    })
  }

  return (
    <Modal
      title={isEditing ? `Editar ${initialTask.key}` : 'Nueva tarea'}
      subtitle={
        !isEditing && (
          <>
            Se agregará en <strong>{statusLabel}</strong>
          </>
        )
      }
      onClose={onCancel}
    >
      <form className={form.form} onSubmit={handleSubmit}>
        <label className={form.field}>
          <span className={form.label}>
            Título <span className={form.required}>*</span>
          </span>
          <input
            className={form.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="¿Qué hay que hacer?"
            maxLength={120}
            required
            autoFocus
          />
        </label>

        <label className={form.field}>
          <span className={form.label}>Descripción</span>
          <textarea
            className={`${form.input} ${form.textarea}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalles (opcional)"
            rows={4}
          />
        </label>

        <div className={form.row}>
          <label className={form.field}>
            <span className={form.label}>Prioridad</span>
            <select
              className={form.input}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {PRIORITIES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>

          <label className={form.field}>
            <span className={form.label}>Etiqueta</span>
            <input
              className={form.input}
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Ej. Frontend"
              maxLength={24}
            />
          </label>
        </div>

        <div className={form.actions}>
          <button type="button" className={form.secondary} onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className={form.primary} disabled={!title.trim()}>
            {isEditing ? 'Guardar cambios' : 'Crear tarea'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default TaskForm
