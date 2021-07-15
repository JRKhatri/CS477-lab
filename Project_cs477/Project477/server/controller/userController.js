const User = require("../models/user");
const jwt = require("jsonwebtoken");
const secret = 'cs477-lab5-assignment'




//need to : npm install jsonwebtoken (third party API to generate token)

exports.login = (req, res, next) => {
    //get username n pw from bowser login page and verify with data
    const user = new User (null,req.body.username, req.body.password, req.body.role).login();
    
    // if user exists generate the token 
    if(user){
        const jwtToken = jwt.sign({
            username: user.username,
            role: user.role
        }, secret)
        res.json({jwtToken})
    }else {
        res.json({"error":"Invalid Username or Password"})
    }
}

exports.authorize = (req, res, next) =>{
    
    console.log(req.headers.authorization)
    const authHeader = req.headers.authorization; // Bearer ekejfifdkdk.mdmd.mdmdmama(token)
    //console.log(authHeader);
    if(authHeader){
        const jwtToken = authHeader.split(" ")[1];
        //async way so call back(can be done in sync also)
        const payload = jwt.verify(jwtToken, secret, (err, user) =>{
            if(err){
                console.log("#######")
                console.log(user)
                res.status(403).json({error: "Forbidden"})
            } else {
                console.log("*********")
                console.log(user)
        
                req.user = user
                next();
               
            }
        })
        
    } else {
        console.log("abc")
        res.status(401).json({error: "Unauthorized"})
    }
}

exports.authorizeAdmin = (req, res, next) =>{
    if(req.user.role === "admin"){
        next();
    } else {
        res.status(401).json({error: "Unauthorized"})
    }

}
exports.authorizeUsername = (req , res, next) =>{         
  console.log("6^^^^^^^^^^^^^^^^^^^^^")
    //if(req.params.username == req.user.username){
        if(req.user.username === req.params.username){
           console.log(req.user.role)
        console.log("@")
        next();

        } else {
            console.log("jajaja")
        res.status(401).json({error: "Unauthorized"})
    }
}


exports.authorizeGuest = (req , res, next) =>{
    console.log("I am guest")
    console.log(req.user.role)
    if(req.user.role ==="guest"){
        next();
    } else {
        console.log("mMMMMMMMm")
        res.status(401).json({error: "Unauthorized"})
    }
}



exports.saveMember = (req, res, next) =>{
    const reqBody = req.body;
    console.log("88888")
    console.log(reqBody)
    const newMember = new User (null, reqBody.username, reqBody.password, reqBody.firstname, reqBody.lastname, reqBody.address, reqBody.city, reqBody.zip, reqBody.role);

     const userNameIndex = newMember.checkUserName();
     if(userNameIndex > -1){
         res.json({error: `Username:${reqBody.username} already exists! Please use another username`})
     } else{
         const memAdded =newMember.saveMember();
        res.json(memAdded);
     }
    
    //}
}
exports.viewUserInfo = (req, res, next)=>{
    console.log("9090 iam")
    console.log(req.params)
    const userInfo = User.getUserinfo(req.params.username);
    console.log(userInfo)
    res.json(userInfo)
}

exports.updateInfo =(req, res, next) =>{
    console.log("123123")
    const reqBody = req.body;
    const updateMember = new User(req.params.id, req.params.userName,reqBody.password, reqBody.firstname, reqBody.lastname, reqBody.address, reqBody.city, reqBody.zip, reqBody.role);
    updateMember.updateMember()
    res.status(200).json(updateMember)
}


  
