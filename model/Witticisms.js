const db = require('./DB')
const { DataTypes } = require('sequelize')

const Witticisms = db.define('Witticisms', {
  sentence: { type: DataTypes.TEXT, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false }
}, {
  paranoid: true
})

module.exports = Witticisms