import { describe, expect, it } from 'vitest'
import { filterTasks } from '../../src/utils/search.js'

const tasks = [
  { key: 'KT-1', title: 'Diseñar menú', description: '', label: 'Frontend' },
  { key: 'KT-2', title: 'Crear API', description: 'Endpoint de búsqueda', label: '' },
  { key: 'KT-12', title: 'Escribir pruebas', description: 'Con Vitest', label: 'QA' },
]

const keysOf = (list) => list.map((task) => task.key)

describe('filterTasks', () => {
  it('devuelve todas las tareas si la búsqueda está vacía', () => {
    expect(filterTasks(tasks, '')).toEqual(tasks)
    expect(filterTasks(tasks, '   ')).toEqual(tasks)
  })

  it('busca por título sin distinguir mayúsculas ni tildes', () => {
    expect(keysOf(filterTasks(tasks, 'DISENAR'))).toEqual(['KT-1'])
  })

  it('busca también en descripción, etiqueta y código', () => {
    expect(keysOf(filterTasks(tasks, 'busqueda'))).toEqual(['KT-2'])
    expect(keysOf(filterTasks(tasks, 'front'))).toEqual(['KT-1'])
    expect(keysOf(filterTasks(tasks, 'kt-12'))).toEqual(['KT-12'])
  })

  it('devuelve una lista vacía si nada coincide', () => {
    expect(filterTasks(tasks, 'inexistente')).toEqual([])
  })
})
