import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { loadNextNumber, loadTasks, saveNextNumber, saveTasks } from '../../src/utils/storage.js'

// localStorage falso en memoria (las pruebas corren en Node, sin navegador).
function createFakeStorage() {
  const data = new Map()
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    clear: () => data.clear(),
  }
}

describe('storage', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createFakeStorage())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('guarda y vuelve a cargar las tareas', () => {
    const tasks = [{ id: '1', title: 'Tarea de prueba', status: 'pending' }]
    saveTasks(tasks)
    expect(loadTasks()).toEqual(tasks)
  })

  it('devuelve una lista vacía si no hay datos o están dañados', () => {
    expect(loadTasks()).toEqual([])

    localStorage.setItem('kanban-taller:tasks', '{esto no es JSON')
    expect(loadTasks()).toEqual([])

    localStorage.setItem('kanban-taller:tasks', JSON.stringify({ no: 'es una lista' }))
    expect(loadTasks()).toEqual([])
  })

  it('el siguiente número de tarea empieza en 1 y se guarda', () => {
    expect(loadNextNumber()).toBe(1)

    saveNextNumber(8)
    expect(loadNextNumber()).toBe(8)

    saveNextNumber(-3)
    expect(loadNextNumber()).toBe(1)
  })
})
