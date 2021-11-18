const express = require("express")
const app = express();
const users=require("./users.json")
app.get("/",(req,res)=>{
   res.send("hello")
})
// middleware
app.use(express.json());


app.get("/users",(req,res)=>{
    var a="anmol"
    res.send({users})
 })

//  post
app.post("/users",(req,res)=>{
    console.log(req.body)
    const newUsers=[...users ,req.body]
res.send(newUsers);
})
// patch update single item put a colon to make it dynamic
app.patch("/:author",(req,res)=>{
console.log(req.params);
const newUsers = users.map(user=>{
    if(req.params.author===user.author){
        user=req.body;
    }
    return user
})
 res.send(newUsers)
})
// delete the item 
app.delete("/:author",(req,res)=>{

    console.log(req.params)
    const newUsers = users.filter((user)=> user.author !== req.params.author);
    res.send(newUsers);
});
// single item get
app.get("/:author",(req,res)=>{
    console.log(req.params)
    const newUsers = users.filter((user)=> user.author === req.params.author);
    res.send(newUsers);
})
app.listen(2345,()=>{
console.log("listening on port 2345")
})
