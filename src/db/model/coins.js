const mongo=require("../index");


async function insertCoinChange(user,coinChange,gameSessionId){
    let client=await mongo.startConnection();
    if(!user||!coinChange||!gameSessionId){
        throw new Error("Data Missing");
    }
   const dataToBeInserted={
    gameSessionId,
    user,
    coinChange,
    updateTime:Date.now()
   }
    const collection=client.db("nextStead").collection("coins");
    try {
        await collection.insertOne(dataToBeInserted)
    } catch (error) {
        console.log(error);
        throw new Error("Failed to insert gameData ");
    }
}

async function getAllCoinsForAGameSession(user,gameSessionId){
    let client=await mongo.startConnection();
    if(!user||!gameSessionId){
        throw new Error("Data Missing");
    }
    const collection=client.db("nextStead").collection("coins");
    try {
      const totalCoins=  await collection.aggregate([
            {
              '$match': {
                'gameSessionId': gameSessionId, 
                'user': user
              }
            }, {
              '$group': {
                '_id': '$gameSessionId', 
                'coins': {
                  '$sum': '$coinChange'
                }
              }
            }
          ]).toArray();
          return totalCoins;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to insert gameData ");
    }
   
}

module.exports={
    insertCoinChange,
    getAllCoinsForAGameSession
}