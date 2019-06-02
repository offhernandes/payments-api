const getObjectValue = require('../../../helpers/getObjectValue')

module.exports = body => {
  let errors = []
  const fields = [
    'customerId',
    'buyer.email',
    'buyer.cpf',
    'amount',
    'method'
  ]

  fields.forEach(field => {
    if (getObjectValue(field, body) === undefined) {
      errors.push({ path: field, message: 'VALUE_REQUIRED' })
    }
  })

  const paymentMethods = ['credit-card', 'boleto']
  if (paymentMethods.indexOf(body.method) === -1) {
    errors.push({
      path: 'method',
      message: 'INVALID_VALUE',
      enum: paymentMethods
    })
  }

  return errors
}
