import * as f from './fmt'

// To test this file, use: npm test -- utils-test

describe('fmtMoney', () => {
  const number = 12345.06789

  it('returns formatted number with 2 decimal places', () => {
    const num = f.fmtMoney(number)
    expect(num).toEqual('12345.07')
  })

  it('returns formatted number with 3 decimal places', () => {
    const num = f.fmtMoney(number, 3)
    expect(num).toEqual('12345.068')
  })

  it('returns formatted number with 1 decimal places', () => {
    const num = f.fmtMoney(number, 1)
    expect(num).toEqual('12345.1')
  })

  it('returns formatted number with comma', () => {
    const num = f.fmtMoney(number, 2, true)
    expect(num).toEqual('12,345.07')
  })

  it('returns 0.00 from empty input', () => {
    const num = f.fmtMoney('')
    expect(num).toEqual('0.00')
  })

  it('returns currency formatted number', () => {
    const num = f.fmtMoney(number, 2, true, true)
    expect(num).toEqual('$12,345.07')
  })

  it('returns null', () => {
    const num = f.fmtMoney()
    expect(num).toBeNull()
  })
})
