const db = require('./DB')
const { DataTypes } = require('sequelize')
const { getDateTime,dateFormat } = require('../util/index')

const Types = db.define('Types', {
  name: { type: DataTypes.STRING, allowNull: false },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      return dateFormat(getDateTime(this.getDataValue('createdAt')))
    }
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      return dateFormat(getDateTime(this.getDataValue('updatedAt')))
    }
  },
}, {
  paranoid: true
})



module.exports = Types