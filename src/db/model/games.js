const mongo=require("../index");

async function insertGame(gameData){
    let client=await mongo.startConnection();
    if(!gameData){
        throw new Error("Data Missing");
    }
    gameData["sessionStart"]=true;
    gameData["gameEnded"]=false;
    
    const collection=client.db("nextStead").collection("games");
    try {
        await collection.insertOne(gameData)
    } catch (error) {
        console.log(error);
        throw new Error("Failed to insert gameData ");
    }
}

async function endGame(gameData){
    let client=await mongo.startConnection();
    if(!gameData){
        throw new Error("Data Missing");
    } 
    const collection=client.db("nextStead").collection("games");
    try {
       const endedGameSession= await collection.findOneAndUpdate(gameData,
        {$set:{sessionStart:false,gameEnded:true,endTime:Date.now()}},
       {returnDocument : 'after'});
        console.log("Game Ended");
        return endedGameSession.value;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to end game ");
    }
}

async function getGame(user,sessionStart,gameEnded){
    let client=await mongo.startConnection();
    if(!user){
        throw new Error("Data Missing");
    } 
    const gameData={
        user,
        sessionStart,
        gameEnded
    }
    const collection=client.db("nextStead").collection("games");
    try {
        return await collection.findOne(gameData);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to find gameData ");
    }
}

module.exports={
    insertGame,
    endGame,
    getGame
}