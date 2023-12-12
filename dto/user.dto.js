class RegisterUserData {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

class UserData {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
    }
}

class LoginUserData {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

class UserDataForUpdate {
    constructor(oldPassword, newPassword) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}

module.exports = { RegisterUserData, UserData, LoginUserData, UserDataForUpdate };
