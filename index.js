const express=require('express');
require("dotenv").config();

const PORT=process.env['PORT'];
const app = express();
const mongo = require("./src/db/index")
const userRouter=require("./src/Routes/user");
const gameRouter=require("./src/Routes/game");
const coinRouter=require("./src/Routes/coin");




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user',userRouter)
app.use('/game',gameRouter)
app.use('/coin',coinRouter)




app.listen(PORT, async() => {
    console.log(`Server running on PORT ${PORT}`)
    await mongo.startConnection();
})