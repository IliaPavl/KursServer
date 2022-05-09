const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, require: true},
    email: {type: DataTypes.STRING, unique: true, require: true},
    password: {type: DataTypes.STRING, require: true},
    login: {type: DataTypes.STRING,unique: true, require: true},
    role: {type: DataTypes.STRING, defaultValue: "USER", require: true},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false, require: true},
    isBlocked: {type: DataTypes.BOOLEAN, defaultValue: false, require: true},
    activationLink: {type: DataTypes.STRING, require: true},
})

const TokenShema = sequelize.define('tokens', {
    resreshToken: {type: DataTypes.STRING, require: true},
})

User.hasOne(TokenShema)
TokenShema.belongsTo(User)
module.exports = {
    User,
    TokenShema
}





