const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, require: true},
    email: {type: DataTypes.STRING, unique: true, require: true},
    password: {type: DataTypes.STRING, require: true},
    login: {type: DataTypes.STRING,unique: true, require: true},
    role: {type: DataTypes.STRING, defaultValue: "USER" },
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false },
    isBlocked: {type: DataTypes.BOOLEAN, defaultValue: false },
    activationLink: {type: DataTypes.STRING},
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





