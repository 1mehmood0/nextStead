const Router=require('express').Router();
const {createJwt}=require("../utils/auth")
const userModel=require("../db/model/users")
const coinModel=require("../db/model/coins")
const gameModel=require("../db/model/games")
const auth=require("../utils/middleware")

Router
.post('/start',auth,startGame)
.post('/stop',auth,endGame)

async function startGame(req,res){
const user=req.userData.user;
const startTime=Date.now();
await gameModel.insertGame({user,startTime});
res.status(200).json({
    "Message":"Game Started"
});
}

async function endGame(req,res){
    const user=req.userData.user;
    const sessionStart=true;
    const endedGameSession= await gameModel.endGame({user,sessionStart});
    console.log(endedGameSession,user);
    if(!endedGameSession){
        res.status(500).send("Game already ended or some error occured");
    }else{
   const totalCoins= await coinModel.getAllCoinsForAGameSession(user,endedGameSession._id);
    res.status(200).json({
        "Message":"Game ended",
        "totalCoins":totalCoins[0].coins
    });
    }
}

module.exports=Router