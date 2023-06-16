const mongo=require("mongodb");
const MongoClient = mongo.MongoClient;
const DB_URL=process.env.DB_URL;

async function startConnection(){
    let client;
    
    if(client){
return client;
    }
try {
    //console.log(DB_URL)
    client=await MongoClient.connect(DB_URL);
     //console.log(client)
     //db=client.db('nextStead');
     console.log("DB COnnected..");
     return client;
    
} catch (error) {
    throw new Error("Database Error");
}
}
module.exports={startConnection};