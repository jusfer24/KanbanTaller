// Tablero: renderiza las tres columnas (Pendiente, En progreso, Completado).
import { COLUMNS } from '../../constants/taskStatus.js'
import Column from '../Column/Column.jsx'
import styles from './Board.module.css'

function Board({ tasks, isFiltering, onAdd, onEdit, onDelete, onMove }) {
  return (
    <div className={styles.board}>
      {COLUMNS.map((column) => (
        <Column
          key={column.status}
          status={column.status}
          label={column.label}
          tasks={tasks.filter((task) => task.status === column.status)}
          isFiltering={isFiltering}
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </div>
  )
}

export default Board
