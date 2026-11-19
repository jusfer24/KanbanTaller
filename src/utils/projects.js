// Elimina un proyecto de la lista y decide cuál queda seleccionado.
// - No permite eliminar el último proyecto (siempre debe quedar uno).
// - Si se elimina el proyecto actual, se selecciona el primero que quede.
export function removeProject(projects, projectId, currentProjectId) {
  const exists = projects.some((project) => project.id === projectId)
  if (!exists || projects.length <= 1) {
    return { projects, currentProjectId }
  }

  const remaining = projects.filter((project) => project.id !== projectId)
  const nextCurrentId =
    currentProjectId === projectId ? remaining[0].id : currentProjectId

  return { projects: remaining, currentProjectId: nextCurrentId }
}
