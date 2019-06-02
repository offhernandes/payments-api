const getObjectValue = require('../../../helpers/getObjectValue')

module.exports = body => {
  let errors = []

  if (body.method !== 'credit-card') {
    return errors
  }

  const creditCardFields = [
    'card.holderName',
    'card.number',
    'card.cvv',
    'card.expirationDate'
  ]

  creditCardFields.forEach(field => {
    if (getObjectValue(field, body) === undefined) {
      errors.push({ path: field, message: 'VALUE_REQUIRED' })
    }
  })

  if (body.card && body.card.number && body.card.number.replace(/\s/, '').length < 16) {
    errors.push({ path: 'card.number', message: 'TOO_SHORT' })
  }

  return errors
}
