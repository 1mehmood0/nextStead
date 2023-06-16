const Router=require('express').Router();
const {createJwt}=require("../utils/auth")
const userModel=require("../db/model/users")
const auth=require("../utils/middleware")

Router
.post('/register',register)
.post('/login',login)

async function register(req,res){
    const {user,password}=req.body;
    if(!user||!password){
        res.status(400).send("Bad Request")
    }else{
    userModel.insertUser({user,password})
    res.status(200).send({
        "message":"User Created"
    })
}
}
async function login(req,res){

const user=req.body.user;
const password=req.body.password;
if(!user||!password)
{
    res.status(400).send("Bad Request")
}else{
   const userData= await userModel.getUserFromUserAndPassword(user,password);
   console.log(userData);
   if(!userData){
    res.status(403).send("Invalid Credentials")
   }
   if(userData.user==user&&userData.password==password){
    const jwt=createJwt({user});
    res.status(200).send({
        "Message":"Login Success",
        jwt
    })
   }
}
}

module.exports=Router;