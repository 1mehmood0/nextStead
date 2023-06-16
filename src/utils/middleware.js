const {verifyJwt}=require("./auth")
const userModel=require("../db/model/users")


async function auth(req,res,){
    if(!req.headers.token){
        res.status(403).send("Auth Token header missing");
    }
    else{
        const decodedToken=verifyJwt(req.headers.token);
        if(!decodedToken){
            throw new Error("Invalid JWT");
        }
        else{
            const userData=await userModel.getUserFromUsername(decodedToken);
            if(!userData){
                throw new Error("Corrupted Token! No User Found")
            }
            else{
                req.user=userData;
            }
        }

    }
}

module.exports=auth;