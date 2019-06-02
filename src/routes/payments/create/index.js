const validate = require('./validate')

module.exports = async ctx => {
  const Payment = ctx.db.model('Payment')
  const body = ctx.request.body
  let errors = validate(body)

  if (errors.length) {
    return { status: 'error', errors }
  }

  body.status = body.method === 'boleto' ? 'paid' : 'unpaid'
  let payment = await Payment.create(body)
  payment = payment.get({ plain: true })

  if (body.method === 'boleto') {
    return { status: 'ok', content: { id: payment.publicId, status: 'paid' } }
  }

  const content = {
    status: payment.status,
    id: payment.publicId
  }
  return { status: 'ok', content }
}
