const express =require("express");
const app=express();
const users=require("./users.json");
const logger=(req,res,next)=>{
    console.log("before logger");
    
    console.log(req)
    next();
    console.log("after logger")
}
app.use(logger);
app.use(express.json())
app.get("/",(req,res)=>{
    console.log("get home");
    res.send(users)
});
app.post("/",
(req,res,next)=>{
    console.log("post");
    
    console.log(req.body)
   const newUsers=[...users,req.body];
 res.send(newUsers);
next();
})
app.listen(3000,(req,res)=>{
    console.log("server is running on 3000")
})