
const {User} = require('../models/models');



class UserController {
    async registration(req, res, next) {
        try{
            
        }catch(e){}
       
    }
    async logout(req, res, next) {
        try{}catch(e){

        }
    }
    async getUsers(req, res) {
        try{
            res.json(['123','122444']);
    }catch(e){
            
        }
    }
    async login(req, res, next) {
        try{}catch(e){

        }
    }
    async active(req, res) {
        try{}catch(e){

        }
    }
    async refresh(req, res) {
        try{}catch(e){

        }
    }
 
    async deliteUser(req, res) {
        try{}catch(e){

        }
    }

}

module.exports = new UserController()
