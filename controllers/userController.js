const {User} = require('../models/models');
const userServise = require('../service/userService')
const Cheaks = require('../checks/userControllerCheaks')



require('dotenv').config()



class UserController {
    async registration(req, res, next) {
        try{
            await Cheaks.registrationCheak(req,next);
            const {email,password,login}=req.body;
            const userData = await userServise.registration(email,login,password);
            res.cookie('refreshToken',userData.refreshToken,{maxAge: 5*24*60*60*1000,httpOnly: true})
            return res.json(userData);
        }catch(e){ next(e)}
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userServise.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }
    async getUsers(req, res, next) {
        try{
            const users = await userServise.getUsers();
            return res.json(users);
           
        } catch(e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userServise.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        } 
    }
    async newPassword(req, res) {
        try{}catch(e){
            next(e);
        }
    }
    async refresh(req, res) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userServise.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
 
    async deliteUser(req, res) {
        try{}catch(e){
            next(e);
        }
    }

}

module.exports = new UserController()
