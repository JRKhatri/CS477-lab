
class User {
    constructor(username, password, role){
        this.username = username;
        this.password = password;
        this.role = role;
    }
    login(){
        return users.find(item => item.username === this.username && item.password === this.password);

    }
}

 const users = [new User("john", "admin123", "admin"), new User ("smith", "smith345", "user")]

module.exports = User;