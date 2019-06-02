const v = require('../../../src/routes/payments/create/validateCreditCard')

describe('validateCreditCard', () => {
  it('return empty array for not credit card payment method', () => {
    const result = v({ method: 'boleto' })
    expect(result).toEqual([])
  })

  it('return one error for undefined cvv', () => {
    const body = {
      method: 'credit-card',
      card: {
        holderName: 'tester',
        number: '0000 0000 0000 0000',
        expirationDate: '02/20'
      }
    }
    const result = v(body)
    expect(result.shift()).toEqual({
      path: 'card.cvv',
      message: 'VALUE_REQUIRED'
    })
  })

  it('return one error for card number too short', () => {
    const body = {
      method: 'credit-card',
      card: {
        holderName: 'tester',
        number: '0000 0000 0000',
        expirationDate: '02/20',
        cvv: '000'
      }
    }
    const result = v(body)
    expect(result.shift()).toEqual({
      path: 'card.number',
      message: 'TOO_SHORT'
    })
  })

  it('return empty array for valid body', () => {
    const body = {
      method: 'credit-card',
      card: {
        holderName: 'tester',
        number: '0000 0000 0000 0000',
        expirationDate: '02/20',
        cvv: '000'
      }
    }
    const result = v(body)
    expect(result).toEqual([])
  })
})
