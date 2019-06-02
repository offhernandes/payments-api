const validator = require('../../src/helpers/getObjectValue')

describe('getObjectValue', () => {
  it('returns true for one level', () => {
    const result = validator('a', { a: 'a' })
    expect(result).toBe('a')
  })

  it('returns true for two levels deep', () => {
    const result = validator('a.b', { a: { b: false } })
    expect(result).toBe(false)
  })

  it('returns true for 5 levels deep', () => {
    const ob = {
      a: {
        b: {
          c: {
            d: {
              e: false
            }
          }
        }
      }
    }
    const result = validator('a.b.c.d.e', ob)
    expect(result).toBe(false)
  })

  it('returns false for path not found', () => {
    const result = validator('a.b', { a: true })
    expect(result).toBe(undefined)
  })
})
