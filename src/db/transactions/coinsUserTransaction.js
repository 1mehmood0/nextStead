const mongo=require("../index");

async function recordCoinAndUpdateUserTransaction(user,coinChange,gameSessionId,updatedCoins){
    const transactionOptions = {
        readConcern: { level: 'snapshot' },
        writeConcern: { w: 'majority' },
        readPreference: 'primary'
      };
      const client = await mongo.startConnection();
      const session = client.startSession();
      try {
        session.startTransaction(transactionOptions);

        if(!user||!coinChange||!gameSessionId){
            throw new Error("Data Missing");
        }
       const dataToBeInserted={
        gameSessionId,
        user,
        coinChange,
        updateTime:Date.now()
       }
        const coinsCollection=client.db("nextStead").collection("coins");
        await coinsCollection.insertOne(dataToBeInserted,{session});

        const userCollection=client.db("nextStead").collection("user");
        await userCollection.findOneAndUpdate({user},{$set:{coins:updatedCoins}},{session});
        await session.commitTransaction();
       console.log("Transaction Completed SUccess");
     } catch (error) {
        await session.abortTransaction();
      }
      finally{
        await session.endSession();
      }
}

module.exports={
    recordCoinAndUpdateUserTransaction
}