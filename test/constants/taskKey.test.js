import { describe, expect, it } from 'vitest'
import { buildTaskKey, parseTaskKeyNumber, TASK_KEY_PREFIX } from '../../src/constants/taskKey.js'

describe('códigos de tarea', () => {
  it('construye el código con el prefijo y el número', () => {
    expect(TASK_KEY_PREFIX).toBe('KT')
    expect(buildTaskKey(7)).toBe('KT-7')
  })

  // PRUEBA FALLIDA INTENCIONAL (taller): espera un formato con cero a la
  // izquierda ("KT-07"), pero los códigos se generan como "KT-7".
  it('rellena el número con ceros a la izquierda', () => {
    expect(buildTaskKey(7)).toBe('KT-07')
  })

  it('extrae el número de un código válido', () => {
    expect(parseTaskKeyNumber('KT-12')).toBe(12)
    expect(parseTaskKeyNumber(buildTaskKey(3))).toBe(3)
  })

  it('devuelve 0 si el código no es válido', () => {
    expect(parseTaskKeyNumber(undefined)).toBe(0)
    expect(parseTaskKeyNumber('KT')).toBe(0)
    expect(parseTaskKeyNumber('KT-abc')).toBe(0)
  })
})
