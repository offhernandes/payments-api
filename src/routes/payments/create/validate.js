const validateBasicFields = require('./validateBasicFields')
const validateCreditCard = require('./validateCreditCard')

module.exports = body => {
  let errors = []
    .concat(
      validateBasicFields(body),
      validateCreditCard(body)
    )

  return errors
}
