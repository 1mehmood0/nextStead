const express=require('express');
require("dotenv").config();

const PORT=process.env['PORT'];
const app = express();
const mongo = require("./src/db/index")
const userRouter=require("./src/Routes/user");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user',userRouter)


app.listen(PORT, async() => {
    console.log(`Server running on PORT ${PORT}`)
    await mongo.startConnection();
})