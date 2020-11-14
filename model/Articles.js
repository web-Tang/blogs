const db = require('./DB')
const { DataTypes } = require('sequelize')
const { getDateTime, dateFormat } = require('../util/index')

const Articles = db.define('Articles', {
  title: { type: DataTypes.STRING, allowNull: false },
  form: { type: DataTypes.STRING, allowNull: false },
  coverUrl: { type: DataTypes.STRING, allowNull: false },
  articleState: { type: DataTypes.STRING, allowNull: false },
  md: { type: DataTypes.TEXT, allowNull: false },
  html: { type: DataTypes.TEXT, allowNull: false },
  UserId: { type: DataTypes.INTEGER, allowNull: true },
  tags: { type: DataTypes.STRING, allowNull: false },
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

module.exports = Articles