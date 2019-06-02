module.exports = async () => {
  const sequelize = require('./src/sql')

  await sequelize.authenticate()
  await sequelize.sync()
}
