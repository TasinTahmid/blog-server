class Register{
    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

class Login{
    constructor(email, password){
        this.email = email;
        this.password = password;
    }
}

class UpdateUserById{
    constructor(password){
        this.password = password;
    }
}

class DeleteUserById{
    constructor(password){
        this.password = password;
    }
}

module.exports = { Register, Login, UpdateUserById, DeleteUserById };