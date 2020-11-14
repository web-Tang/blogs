const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("blogs", "root", "pmdbrootpassword", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
