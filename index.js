const express=require("express")
const mongoose=require("mongoose")

const bodyparser=require("body-parser");
const userRoutes=require("./routes/user")
const offerRoutes=require("./routes/offer")

const PORT=process.env.PORT ||8080
const app=express();
mongoose.connect("mongodb://localhost:27017/user").then(()=>{
    console.log("successfully connected to db")

}).catch(()=>{
    console.log("failed to connect to database")

})
app.use(bodyparser.json());

app.listen(PORT,()=>{
    console.log("server started at"+" "+ PORT)
})
app.use("/user",userRoutes)
app.use("/offer",offerRoutes)