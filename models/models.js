const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, require: true},
    email: {type: DataTypes.STRING, unique: true, require: true},
    password: {type: DataTypes.STRING, require: true},
    login: {type: DataTypes.STRING,unique: true, require: true},
    role: {type: DataTypes.STRING, defaultValue: "USER" },
    isBanned: {type: DataTypes.BOOLEAN, defaultValue: false },
})

const TokenShema = sequelize.define('tokens', {
    refreshToken: {type: DataTypes.STRING, require: true},
})

User.hasOne(TokenShema)

module.exports = {
    User,
    TokenShema
}





