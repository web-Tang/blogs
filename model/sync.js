const Users = require('./Users')
const Articles = require('./Articles')
const Types = require('./Types')
const witticisms = require('./Witticisms')
const Historys = require('./Historys')
const Reverts = require('./Reverts')
const sequelize = require('./DB');

// 表关联
// Users.hasMany(Articles);

// Types.hasOne(Articles);
// Articles.belongsTo(Types);

// Articles.hasOne(Historys);
// Historys.belongsTo(Articles);

// Articles.hasOne(Reverts);
// Reverts.belongsTo(Articles);

// Users.hasOne(Reverts);
// Reverts.belongsTo(Users);

// 同步模型表
(async function () {
    await sequelize.sync({ alter: true })
    console.log('模型同步完成')
})()
