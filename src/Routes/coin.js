const Router=require('express').Router();
const {createJwt}=require("../utils/auth")
const transactions=require("../db/transactions/coinsUserTransaction")
const coinsModel=require("../db/model/coins")
const gamesModel=require("../db/model/games")

const auth=require("../utils/middleware")

Router.
post('/',auth,updateMoney);

async function updateMoney(req,res){
    const {user,coins}=req.userData;
    const gameData=await gamesModel.getGame(user,true,false);
    if(!gameData||gameData==null){
        res.status(400).send({
            "Message":"No Game Running For User"
        })
    }
    else{
    console.log("->>",user,gameData);
    const xMultiplier=req.body.x;
    const updatedCoins=coins*xMultiplier;
    const changeOfCoins=updatedCoins-coins;
    await transactions.recordCoinAndUpdateUserTransaction(user,changeOfCoins,gameData._id,updatedCoins);
    res.status(204).send({
        "message":"Coins Updated"
    })
}
}

module.exports=Router