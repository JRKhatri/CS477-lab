

//let member =[];
let count = 1;

class User {
    constructor(id, username, password, firstname, lastname, address, city, zip, role){
        this.id=id
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.city =city;
        this.zip = zip;
        this.role =role;

    }

    login(){
        return member.find(item => item.username === this.username && item.password === this.password);

    }
saveMember(){
    this.id= count++;
    member.push(this);
    return this;
}

checkUserName(){
    if(member.length === 0){
        return -1;
    }else {
    return member.findIndex(item => item.username === this.username);

}

}

updateMember(){
    
    const memIndex = member.findIndex(item => item.username === this.username);
    if(memIndex >-1){
         member.splice(memIndex, 1, this);
         return this;
    }else {
        throw new Error("ITEM NOT FOUND")

    }

}
static getUserinfo(username){
    console.log(username.username)
    console.log("o o i am at user")
    
    const user =  member.find(item => item.username === username);
    console.log(user)
    return user;

}



static allUsers(){
    return member;
}
}

let member =[new User("100", "xxx","xxx","xxx","xxx","xxx","xxx","123","guest"), new User("101", "yyy","yyy","yyy","yyy","yyy","yyy","111","admin"),]
//  const users = [new User("john", "admin123", "admin"), new User ("smith", "smith345", "user")]

module.exports = User;



console.log("in user class")
console.log(member)