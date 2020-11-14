const db = require("./DB");
const { DataTypes } = require("sequelize");

const Users = db.define(
  "Users",
  {
    loginId: { type: DataTypes.STRING, allowNull: false },
    loginPwd: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    pictureUrl: { type: DataTypes.STRING, allowNull: true },
    sign: { type: DataTypes.STRING, allowNull: true },
    age: { type: DataTypes.DATEONLY, allowNull: true },
    sex: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    paranoid: true, // 软删除,不是 硬删除.
  }
);

module.exports = Users;
