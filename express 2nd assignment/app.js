const express = require("express");
const app = express();
const users=require("./users.json");
const logger = (req,res,next)=>{
   
    req.name= "Anmol Kumar";
    
    next();
   
}
app.use(logger);
// app.get("/",(req,res)=>{
//    res.send("hello")
// })
// middleware
app.use(express.json());
// to find the body
// const authorise = (permission) => {
//     return (req, res, next) => {
//       const originalSendFunc = res.send.bind(res);
//       res.send = function (body) {
//         body.name = "Nrupul Dev";
//         console.log(body); // do whatever here
//         return originalSendFunc(body);
//       };
//       next();
//     };
//   };

app.get("/",(req,res)=>{
    console.log(req.name);
   var api_requested_by =req.name;
   var info="this is your books array";
    res.send({api_requested_by,users,info});
 
   
 })

//  post
app.post("/Books",(req,res)=>{
    console.log(req.body)
    const newUsers=[...users ,req.body]
res.send(newUsers);
})


// patch update single item put a colon to make it dynamic
app.patch("/Books/:id",(req,res)=>{
console.log(req.params);
const newUsers = users.map(user=>{
    if(+req.params.id===user.id){
        user=req.body;
    }
    return user
})
 res.send(newUsers)
})
// delete the item 

app.delete("/:id",(req,res)=>{

    console.log(req.params)
    const newUsers = users.filter((user)=> user.id !== +req.params.id);
    res.send(newUsers);
});
// single item get
// app.get("/:author",(req,res)=>{
//     console.log(req.params)
//     const newUsers = users.filter((user)=> user.author === req.params.author);
//     res.send(newUsers);
// })
app.get("/:Books/:id",(req,res)=>{
    console.log(req.params);
    var api_requested_by =req.name;
    var info="this will have your book ";
    const newUsers = users.filter((user)=> user.id === +req.params.id);
    res.send({api_requested_by,newUsers,info});
})
// middleware function 

app.listen(2345,()=>{
console.log("listening on port 2345")
})
