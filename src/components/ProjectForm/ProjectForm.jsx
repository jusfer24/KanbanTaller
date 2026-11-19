// Formulario (en ventana modal) para crear un proyecto nuevo.
import { useState } from 'react'
import form from '../../styles/form.module.css'
import Modal from '../Modal/Modal.jsx'

function ProjectForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return
    onSubmit(trimmedName)
  }

  return (
    <Modal
      title="Nuevo proyecto"
      subtitle="Cada proyecto tiene su propio tablero de tareas."
      onClose={onCancel}
    >
      <form className={form.form} onSubmit={handleSubmit}>
        <label className={form.field}>
          <span className={form.label}>
            Nombre del proyecto <span className={form.required}>*</span>
          </span>
          <input
            className={form.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Sitio web"
            maxLength={40}
            required
            autoFocus
          />
        </label>

        <div className={form.actions}>
          <button type="button" className={form.secondary} onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className={form.primary} disabled={!name.trim()}>
            Crear proyecto
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default ProjectForm
