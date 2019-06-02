const Op = require('sequelize').Op

module.exports = async ctx => {
  const Payment = ctx.db.model('Payment')

  const payment = await Payment.findOne({
    where: {
      publicId: {
        [Op.eq]: ctx.params.id
      }
    },
    raw: true,
    attributes: ['status']
  })

  return { status: 'ok', content: payment }
}
