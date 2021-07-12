const User = require("../models/user");
const jwt = require("jsonwebtoken");
const secret = 'cs477-lab5-assignment'

//need to : npm install jsonwebtoken (third party API to generate token)

exports.login = (req, res, next) => {
    console.log(req.body)
    //get username n pw from bowser login page and verify with data
    const user = new User (req.body.username, req.body.password, null).login();
    
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
    const authHeader = req.headers.authorization; // Bearer ekejfifdkdk.mdmd.mdmdmama(token)
    //console.log(authHeader);
    if(authHeader){
        const jwtToken = authHeader.split(" ")[1];
        //async way so call back(can be done in sync also)
        const payload = jwt.verify(jwtToken, secret, (err, user) =>{
            if(err){
                res.status(403).json({error: "Forbidden"})
            } else {
                req.user = user
                next();
               
            }
        })
        


    } else {
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

