const initializeApp = async () => {
  const path = require('path')
  const logger = require('koa-logger')
  const bodyParser = require('koa-bodyparser')
  const serve = require('koa-static')
  const views = serve(path.join(__dirname, 'views'))
  const cors = require('@koa/cors')
  const Koa = require('koa')
  const app = new Koa()

  const sql = require('./sql')
  await sql.sync()

  const descriptor = Object.create(null)
  descriptor.value = sql
  Object.defineProperty(app.context, 'db', descriptor)

  app.use(logger())
  app.use(cors())
  app.use(bodyParser())
  app.use(views)

  app.use(require('./routes/payments'))

  app.listen(8080)
  console.log('API running on http://localhost:8080')
}

initializeApp()
