// Encabezado: barra superior (marca, proyectos y buscador) y cabecera del tablero
// (ruta de navegación, nombre del proyecto y botón de crear tarea).
import styles from './BoardHeader.module.css'

function BoardHeader({
  projects,
  currentProject,
  onSelectProject,
  onCreateProject,
  query,
  onQueryChange,
  resultCount,
  onCreateTask,
}) {
  return (
    <header>
      <div className={styles.topbar}>
        <span className={styles.brand}>Kanban Taller</span>

        {/* Proyectos: elegir el actual o crear uno nuevo */}
        <div className={styles.projects}>
          <select
            className={styles.projectSelect}
            value={currentProject.id}
            onChange={(e) => onSelectProject(e.target.value)}
            aria-label="Proyecto actual"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            className={styles.newProjectButton}
            onClick={onCreateProject}
            title="Nuevo proyecto"
          >
            <span aria-hidden="true">+</span>
            <span className={styles.newProjectText}>Nuevo proyecto</span>
          </button>
        </div>

        <div className={styles.search}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="15" y1="15" x2="20" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            className={styles.searchInput}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar tareas..."
            aria-label="Buscar tareas"
          />
        </div>

        {query.trim() && (
          <span className={styles.results}>
            {resultCount} {resultCount === 1 ? 'resultado' : 'resultados'}
          </span>
        )}
      </div>

      <div className={styles.boardHeader}>
        <div>
          <nav className={styles.breadcrumb} aria-label="Ruta de navegación">
            <span>Proyectos</span>
            <span>/</span>
            <span>{currentProject.name}</span>
            <span>/</span>
            <span>Tablero</span>
          </nav>
          <h1 className={styles.title}>{currentProject.name}</h1>
        </div>

        <button type="button" className={styles.createButton} onClick={onCreateTask}>
          <span className={styles.plus} aria-hidden="true">
            +
          </span>
          Crear tarea
        </button>
      </div>
    </header>
  )
}

export default BoardHeader
