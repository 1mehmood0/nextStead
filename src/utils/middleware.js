const {verifyJwt}=require("./auth")
const userModel=require("../db/model/users")


async function auth(req,res,next){
    if(!req.headers.token){
        res.status(403).send("Auth Token header missing");
    }
    else{
        const decodedToken=verifyJwt(req.headers.token);
        if(!decodedToken){
            throw new Error("Invalid JWT");
        }
        else{
            console.log(decodedToken);
            const userData=await userModel.getUserFromUsername(decodedToken.user);
            if(!userData){
                throw new Error("Corrupted Token! No User Found")
            }
            else{
                req.userData=userData;
                next();
            }
        }

    }
}

module.exports=auth;