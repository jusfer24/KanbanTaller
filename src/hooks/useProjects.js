// Hook con la lógica de proyectos: listar, crear y elegir el proyecto actual.
import { useEffect, useState } from 'react'
import { DEFAULT_PROJECT } from '../constants/project.js'
import {
  loadCurrentProjectId,
  loadProjects,
  saveCurrentProjectId,
  saveProjects,
} from '../utils/storage.js'

// Carga los proyectos guardados; si no hay ninguno, crea el proyecto inicial.
function loadInitialState() {
  const stored = loadProjects().filter((project) => project?.id && project?.name)
  const projects = stored.length
    ? stored
    : [{ ...DEFAULT_PROJECT, createdAt: new Date().toISOString() }]

  const savedId = loadCurrentProjectId()
  const currentId = projects.some((project) => project.id === savedId)
    ? savedId
    : projects[0].id

  return { projects, currentId }
}

export function useProjects() {
  const [initial] = useState(loadInitialState)
  const [projects, setProjects] = useState(initial.projects)
  const [currentProjectId, setCurrentProjectId] = useState(initial.currentId)

  // Guarda en localStorage cada vez que cambian los datos.
  useEffect(() => {
    saveProjects(projects)
  }, [projects])

  useEffect(() => {
    saveCurrentProjectId(currentProjectId)
  }, [currentProjectId])

  const currentProject =
    projects.find((project) => project.id === currentProjectId) ?? projects[0]

  // Crea un proyecto y lo deja seleccionado.
  function addProject(name) {
    const newProject = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
    }
    setProjects((prev) => [...prev, newProject])
    setCurrentProjectId(newProject.id)
  }

  return { projects, currentProject, addProject, selectProject: setCurrentProjectId }
}
