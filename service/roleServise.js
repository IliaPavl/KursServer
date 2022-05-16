require('dotenv').config()
const {Role} = require('../models/models')


class RoleServise{
    async generateStartRole(){
        if(!await Role.findOne({where: {roleName: process.env.ADMIN_ROLE}}))
        await Role.create({id:1,roleName:process.env.ADMIN_ROLE})
        if(!await Role.findOne({where: {roleName: process.env.USER_ROLE}}))
        await Role.create({id:2,roleName:process.env.USER_ROLE})
    }
    async getRole(id){
        return Role.findOne({where: {id:id}})
    }
}
module.exports = new RoleServise();