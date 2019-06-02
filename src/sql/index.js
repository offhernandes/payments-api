const Sequelize = require('sequelize')
const config = require('config')

const sql = new Sequelize(
  config.get('mysql.database'),
  config.get('mysql.username'),
  config.get('mysql.password'),
  {
    host: config.get('mysql.host'),
    dialect: 'mysql',
    logging: false
  }
)

require('./models/Payment')(sql)

module.exports = sql
