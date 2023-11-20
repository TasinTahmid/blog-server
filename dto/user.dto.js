class UserForRegistration{
    username;
    email;
    password;
    constructor(body){
        this.username = body.username;
        this.email = body.email;
        this.password = body.password;
    }
}

class UserForLogin{
    constructor(body){
        this.email = body.email;
        this.password = body.password;
    }
}

module.exports = { UserForRegistration, UserForLogin };