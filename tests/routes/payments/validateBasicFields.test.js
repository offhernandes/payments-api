const v = require('../../../src/routes/payments/create/validateBasicFields')

describe('validateBasicFields', () => {
  it('returns error for customerId and amount', () => {
    const body = {
      buyer: { email: '', cpf: '' },
      method: 'boleto'
    }
    const result = v(body)
    expect(result).toEqual([
      {
        path: 'customerId',
        message: 'VALUE_REQUIRED'
      },
      {
        path: 'amount',
        message: 'VALUE_REQUIRED'
      }
    ])
  })

  it('returns error for customerId', () => {
    const body = {
      buyer: { email: '', cpf: '' },
      amount: '',
      method: 'boleto'
    }
    const result = v(body)
    expect(result).toEqual([
      {
        path: 'customerId',
        message: 'VALUE_REQUIRED'
      }
    ])
  })

  it('returns error for invalid payment method', () => {
    const body = {
      buyer: { email: '', cpf: '' },
      amount: '',
      customerId: 0,
      method: 'not ok'
    }
    const result = v(body)
    expect(result.shift()).toMatchObject({
      path: 'method',
      message: 'INVALID_VALUE'
    })
  })
})
