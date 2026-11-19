// Ventana modal reutilizable: fondo oscuro, título, cierre con Escape o clic fuera.
import { useEffect, useId } from 'react'
import styles from './Modal.module.css'

function Modal({ title, subtitle, onClose, children }) {
  const titleId = useId()

  // Cerrar con la tecla Escape.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Cerrar al hacer clic fuera del cuadro.
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div className={styles.backdrop} onMouseDown={handleBackdropClick}>
      <div className={styles.panel} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children}
      </div>
    </div>
  )
}

export default Modal
