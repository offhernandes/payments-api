const create = require('../../../src/routes/payments/create')
const sql = require('../../../src/sql')
const Payment = sql.model('Payment')
const Op = require('sequelize').Op

describe('create payment', () => {
  it('return status error', async () => {
    const ctx = {
      db: sql,
      request: { body: {} }
    }
    const result = await create(ctx)

    expect(result.status).toBe('error')
    expect(Array.isArray(result.errors)).toBe(true)
  })

  it('creates boleto payment', async () => {
    const ctx = {
      db: sql,
      request: {
        body: {
          customerId: 10,
          buyer: {
            name: 'Tester',
            email: 'tester@testing.com',
            cpf: '44444444444'
          },
          amount: 150,
          method: 'boleto'
        }
      }
    }
    const result = await create(ctx)

    expect(result.status).toBe('ok')
    expect(result).toHaveProperty('content.id')

    const found = await Payment
      .findOne({
        where: { publicId: { [Op.eq]: result.content.id } },
        raw: true
      })

    expect(found).toMatchObject({ publicId: result.content.id })

    await Payment.destroy({ where: {}, force: true })
  })

  it('creates credit card payment', async () => {
    const ctx = {
      db: sql,
      request: {
        body: {
          customerId: 10,
          buyer: {
            name: 'Tester',
            email: 'tester@testing.com',
            cpf: '44444444444'
          },
          amount: 150,
          method: 'credit-card',
          card: {
            holderName: 'Tester',
            number: '0000 0000 0000 0000',
            cvv: 700,
            expirationDate: '03/99'
          }
        }
      }
    }
    const result = await create(ctx)

    expect(result.status).toBe('ok')
    expect(result).toHaveProperty('content.status')
    expect(result).toHaveProperty('content.id')

    const found = await Payment
      .findOne({
        where: { publicId: { [Op.eq]: result.content.id } },
        raw: true
      })

    expect(found).toMatchObject({
      publicId: result.content.id,
      status: result.content.status
    })

    await Payment.destroy({ where: {}, force: true })
  })
})
