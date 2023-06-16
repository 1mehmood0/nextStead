const mongo=require("../index");

async function insertUser(userData){
    let db=await mongo.startConnection();
    if(!userData){
        throw new Error("Data Missing");
    }
    userData["coins"]=100;
    const collection=db.collection("user");
    try {
        await collection.insertOne(userData)
    } catch (error) {
        console.log(error);
        throw new Error("Failed to insert ");
    }

}

async function getUserFromUsername(user){
    let client=await mongo.startConnection();
    if(!user){
        throw new Error("UserName Missing");
    }
    const collection=client.db("nextStead").collection("user");
    try {
      const userData=  await collection.findOne({user});
      return userData;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch ");
    }
}

async function getUserFromUserAndPassword(user,password){
    let client=await mongo.startConnection();
    if(!user||!password){
        throw new Error("Missing Details");
    }
    const collection=client.db("nextStead").collection("user");
    try {
      const userData=  await collection.findOne({user,password});
      return userData;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch ");
    }
}

module.exports={
    insertUser,
    getUserFromUsername,
    getUserFromUserAndPassword
}