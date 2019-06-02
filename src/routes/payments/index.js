const Router = require('koa-router')
const router = Router({ prefix: '/api/payments' })

const create = require('./create')
router.post('/', async ctx => {
  ctx.body = await create(ctx)
})

const checkStatus = require('./check')
router.get('/:id/status', async ctx => {
  ctx.body = await checkStatus(ctx)
})

module.exports = router.routes()
