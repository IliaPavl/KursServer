const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, require: true},
    email: {type: DataTypes.STRING, unique: true, require: true},
    password: {type: DataTypes.STRING, require: true},
    login: {type: DataTypes.STRING,unique: true, require: true},
    isBanned: {type: DataTypes.BOOLEAN, defaultValue: false },
    roleId: {type: DataTypes.STRING,field: 'role_id', references: {
        model: 'role',
        key: 'id'
      },}
    },
    {
        underscored: true
    }
)

const TokenShema = sequelize.define('tokens', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, require: true},
    userId: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        field: 'user_id',
        require: true,
        references: {
        model: 'user',
        key: 'id'
      },
    },
    refreshToken: {type: DataTypes.STRING, require: true},
},
{
    underscored: true
})

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, require: true},
    roleName: {type: DataTypes.STRING, require: true, field: 'role_name'},
},
{
    underscored: true
})
User.hasOne(TokenShema, {foreignKey:'user_id', targetKey:'id',onDelete: "cascade"});
Role.hasOne(User, {foreignKey:'role_id', targetKey:'id'});



module.exports = {
    User,
    TokenShema,
    Role
}





