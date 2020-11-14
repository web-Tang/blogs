const db = require('./DB')
const { DataTypes } = require('sequelize')

const Reverts = db.define('Reverts', {
  visitorsName: { type: DataTypes.STRING, allowNull: false },   // 游客名称
  ArticleId: { type: DataTypes.INTEGER, allowNull: false },   // 文章ID
  content: { type: DataTypes.TEXT, allowNull: true }
}, {
  paranoid: true
})

module.exports = Reverts