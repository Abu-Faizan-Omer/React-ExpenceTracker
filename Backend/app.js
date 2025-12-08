require('dotenv').config();
const express =require("express")
const app=express()
const bodyparser=require("body-parser")
const cors=require("cors")
const bcrypt=require("bcrypt")

const sequelize=require("./utils/database")
const userRoutes=require("./routes/user")

const User=require("./models/user")


app.use(cors());
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use("/users",userRoutes)


app.use("/",((req,res)=>{
    res.send("this is home page")
}))

sequelize.sync()
.then((result)=>{
    app.listen(3000,()=>{
        console.log(`Server is runnig on Port 3000`)
    })
})
.catch((err)=>{
    console.log(`Error syncing database:`, err)
})

