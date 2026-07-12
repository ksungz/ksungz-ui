import { describe, expect, it } from 'vitest'
import { cx } from './cx'

describe('cx', () => {
  it('joins truthy class names without leaking false values', () => {
    expect(cx('button', false, undefined, 'primary', null)).toBe('button primary')
  })
})
