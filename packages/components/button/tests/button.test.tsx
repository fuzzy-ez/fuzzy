import { describe, expect, it } from 'vitest'

function plus(a: number, b: number): number {
  return a + b
}
describe('basic button', () => {
  it('one plus on', () => {
    expect(plus(1, 1)).toBe(2)
  })
})
