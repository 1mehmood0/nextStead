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

async function getUserFromUsername(userName){
    let db=await mongo.startConnection();
    if(!userName){
        throw new Error("Email Missing");
    }
    const collection=db.collection("user");
    try {
      const userData=  await collection.findOne(userName);
      return userData;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch ");
    }
}

async function getUserFromUserAndPassword(user,password){
    let db=await mongo.startConnection();
    if(!user||!password){
        throw new Error("Missing Details");
    }
    const collection=db.collection("user");
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