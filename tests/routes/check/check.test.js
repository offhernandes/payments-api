const check = require('../../../src/routes/payments/check')
const create = require('../../../src/routes/payments/create')
const sql = require('../../../src/sql')
const Payment = sql.model('Payment')
const Op = require('sequelize').Op

describe('check', () => {
  it('returns null for payment not found', async () => {
    const ctx = {
      db: sql,
      params: { id: '' }
    }

    const result = await check(ctx)
    expect(result.status).toBe('ok')
    expect(result.content).toBeNull()
  })

  it('returns payment status', async () => {
    const createContext = {
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
    const created = await create(createContext)
    const found = await Payment
      .findOne({
        where: { publicId: { [Op.eq]: created.content.id } },
        raw: true
      })

    const ctx = {
      db: sql,
      params: { id: found.publicId }
    }

    const result = await check(ctx)

    expect(found).toBeDefined()
    expect(result.status).toBe('ok')
    expect(result).toHaveProperty('content.status')
    expect(result.content.status).toBe(found.status)
    await Payment.destroy({ where: {}, force: true })
  })
})
