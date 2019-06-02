const Sequelize = require('sequelize')
const uuid = require('uuid/v1')

const schema = {
  customerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  buyerName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  buyerEmail: {
    type: Sequelize.STRING,
    allowNull: false
  },
  buyerCpf: {
    type: Sequelize.STRING,
    allowNull: false
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  method: {
    type: Sequelize.ENUM('credit-card', 'boleto'),
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('paid', 'unpaid'),
    allowNull: false
  },
  publicId: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: uuid
  }
}

const options = {
  setterMethods: {
    buyer (current) {
      Object
        .keys(current)
        .forEach(key => {
          const value = current[key]
          key = 'buyer' + key.charAt(0).toUpperCase() + key.slice(1)
          this.setDataValue(key, value)
        })
    }
  }
}

module.exports = sql => {
  sql.define('Payment', schema, options)
}
