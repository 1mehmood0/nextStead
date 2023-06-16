const jwt=require('jsonwebtoken');

function createJwt(data){
   const jwtEncoded= jwt.sign(data,process.env.SECRET,{expiresIn:'2d'});
   return jwtEncoded;
}

function verifyJwt(encodeJwt){
    try{
    const jwtDecode=jwt.verify(encodeJwt,process.env.SECRET);
    return jwtDecode;
    }catch(E){
        console.log(E);
        throw new Error("JWT verification failed")
    }
}

module.exports={createJwt,verifyJwt}
