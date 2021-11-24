const express = require("express");

const app = express();
// app.get("/",(req,res)=>{
// res.send("welcome to  my channel")
// })
// app.get("/about",(req,res)=>{
//     res.send("welcome to  my channel about")
//     })
//     app.get("/contact",(req,res)=>{
//         res.send("welcome to  my channel contact")
//         })
//         app.get("/users",(req,res)=>{
//             res.sendFile(__dirname+"/db.json");
//             })
app.listen(3000,()=>{
    console.log("server is running on 3000")
});

