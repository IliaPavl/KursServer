module.exports = class UserDTO{
    email;
    id;
    isBanned;
    
    constructor(model){
        this.email= model.email;
        this.id=model.id;
        this.isBanned= model.isBanned; 
    }
}