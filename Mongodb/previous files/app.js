const express =require("express");

const mongoose =require("mongoose");
const app =express();
app.use(express.json());
// connect to mongo db
// create a schema for our data 
// create a model from the schema
const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/test")
};
// schema
const userSchema =new mongoose .Schema({
    first_name:{type:String ,required:true},
    last_name:{type:String ,required:false},
    email:{type:String ,required:true,unique:true},
    gender:{type:String ,required:false,default:"Male"},
    age:{type:Number ,required:true}
   
},{
    versionKey:false,
    timestamps:true,
});
// model
const User =mongoose.model("user",userSchema);
// post
app.post("/users",async(req,res)=>{
    try{
        const user =await User.create(req.body);
        res.status(201).send(user)
    }catch(e){
res.status(500).json({message:e.message});
    }

})
// get
app.get("/users",async (req,res)=>{
    const users= await User.find().lean().exec();
    res.send(users)
})
// get a single item
app.get("/users/:id",async (req ,res)=>{
    const user =await User.findById(req.params.id).lean().exec();
    res.send({user});
})
// patch 
app.patch("/users/:id",async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        })
        return res.status(201).send(user);
    }
    catch(e){
       return res.status(500).json({message:e.message,status:"Failed"});
    }
    
})
// delete
app.delete("/users/:id",async (req,res)=>{
    try{
        const user =await User.findByIdAndDelete(req.params.id).lean().exec();
        res.status(200).send(user)
    }catch(e){
        return  res.status(500).json({message:e.message,status:"Failed"});
    }
   
})
app.listen(2345 ,async function (){
  await connect();
    console.log("listening on port 2345")
})