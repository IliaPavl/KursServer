module.exports = class UserDTO{
    email;
    id;
    isBanned;
    role_id;
    login;
    
    constructor(model){
        this.email= model.email;
        this.id=model.id;
        this.isBanned= model.isBanned;
        this.role_id= model.role_id; 
        this.login = model.login;
    }
}