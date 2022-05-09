
const {User} = require('../models/models');
const userServise = require('../service/userService')



class UserController {
    async registration(req, res, next) {
        try{
            const {email,password,login}=req.body;
            const userData = await userServise.registration(email,login,password);
            res.cookie('refresh',userData.refresh,{maxAge: 5*24*60*60*1000,httpOnly: true})
            return res.json(userData);
        }catch(e){ console.log(e);}
       
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
