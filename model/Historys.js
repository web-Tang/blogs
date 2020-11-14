const db = require('./DB')
const { DataTypes } = require('sequelize')

const History = db.define('History', {
  ArticleId: { type: DataTypes.INTEGER, allowNull: false }
}, {
  paranoid: true
})

module.exports = History