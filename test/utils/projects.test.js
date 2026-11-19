import { describe, expect, it } from 'vitest'
import { removeProject } from '../../src/utils/projects.js'

const projects = [
  { id: 'a', name: 'Proyecto A' },
  { id: 'b', name: 'Proyecto B' },
  { id: 'c', name: 'Proyecto C' },
]

const idsOf = (list) => list.map((project) => project.id)

describe('removeProject', () => {
  it('elimina un proyecto que no es el actual y mantiene la selección', () => {
    const result = removeProject(projects, 'b', 'a')
    expect(idsOf(result.projects)).toEqual(['a', 'c'])
    expect(result.currentProjectId).toBe('a')
  })

  it('si elimina el proyecto actual, selecciona el primero que queda', () => {
    const result = removeProject(projects, 'a', 'a')
    expect(idsOf(result.projects)).toEqual(['b', 'c'])
    expect(result.currentProjectId).toBe('b')
  })

  it('no elimina el último proyecto', () => {
    const single = [{ id: 'a', name: 'Único' }]
    const result = removeProject(single, 'a', 'a')
    expect(result.projects).toBe(single)
    expect(result.currentProjectId).toBe('a')
  })

  it('no cambia nada si el proyecto no existe', () => {
    const result = removeProject(projects, 'x', 'b')
    expect(result.projects).toBe(projects)
    expect(result.currentProjectId).toBe('b')
  })
})
