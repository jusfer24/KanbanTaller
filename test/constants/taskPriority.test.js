import { describe, expect, it } from 'vitest'
import { DEFAULT_PRIORITY, getPriority, PRIORITIES, TASK_PRIORITY } from '../../src/constants/taskPriority.js'

describe('prioridades', () => {
  it('están ordenadas de mayor a menor', () => {
    expect(PRIORITIES.map((p) => p.value)).toEqual([
      TASK_PRIORITY.HIGH,
      TASK_PRIORITY.MEDIUM,
      TASK_PRIORITY.LOW,
    ])
  })

  it('getPriority devuelve los datos de una prioridad conocida', () => {
    expect(getPriority(TASK_PRIORITY.HIGH)).toMatchObject({
      label: 'Alta',
      badge: 'Prioridad alta',
    })
  })

  it('getPriority usa la prioridad media si el valor no existe', () => {
    expect(DEFAULT_PRIORITY).toBe(TASK_PRIORITY.MEDIUM)
    expect(getPriority('urgente').value).toBe(TASK_PRIORITY.MEDIUM)
    expect(getPriority(undefined).value).toBe(TASK_PRIORITY.MEDIUM)
  })
})
