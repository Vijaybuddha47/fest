class UserDTO{

    constructor(user)
    {
        this._id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.createdAt = new Date(user.createdAt);
        this.status = user.status;
        
    }
}

module.exports = UserDTO;