const express=require("express");
const mongoose =require("mongoose");
const app=express();
app.use(express.json());
// connect
// userschema
// module;

// connect
const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/assignment")
};
const userSchema =new mongoose .Schema({
    id:{type:Number ,required:true},
    movie_name:{type:String ,required:true},
    movie_genere:{type:String ,required:false},
    
    production_year:{type:Number ,required:false},
    budget:{type:Number ,required:true}
   
},{
    versionKey:false,
    timestamps:true,
});
// model 
const Movie =mongoose.model("movie",userSchema);
app.post("/movies",async(req,res)=>{
    try{
        const movie =await Movie.create(req.body);
        res.status(201).send(movie)
    }catch(e){
res.status(500).json({message:e.message});
    }

})
// get 
app.get("/movies",async (req,res)=>{
    const movies= await Movie.find().lean().exec();
    res.send(movies)
})
// get a single item
app.get("/movies/:id",async (req ,res)=>{
    const movie =await Movie.findById(req.params.id).lean().exec();
    res.send({movie});
})
// patch 
app.patch("/movies/:id",async(req,res)=>{
    try{
        const movie = await Movie.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        })
        return res.status(201).send(movie);
    }
    catch(e){
       return res.status(500).json({message:e.message,status:"Failed"});
    }
    
})
// delete
app.delete("/movies/:id",async (req,res)=>{
    try{
        const movie =await Movie.findByIdAndDelete(req.params.id).lean().exec();
        res.status(200).send(movie)
    }catch(e){
        return  res.status(500).json({message:e.message,status:"Failed"});
    }
   
})
app.listen(3000,async function (){
    await connect();
    console.log("server is running on 3000")
})