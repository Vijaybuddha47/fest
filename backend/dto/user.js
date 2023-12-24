class UserDTO {

    constructor(user) {
        this._id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.image = user.image ? 'https://da278ww3jdi3v.cloudfront.net/' + user.image : '';
        this.createdAt = new Date(user.createdAt);
        this.status = user.status;
    }
}

module.exports = UserDTO;