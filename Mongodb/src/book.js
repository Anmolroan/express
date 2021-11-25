const express =require("express");
const mongoose =require("mongoose");
const app =express();
app.use(express.json());
const connect = require("./config/db.js");

const User = require("./model/user.model");
const Author = require("./model/author.model");
const Section = require("./model/section.model");
const Book = require("./model/book.model");
/*
first connect
create a schema for our data 
create a model from the schema
*/
// ------------Books Crud-------------------
app.post("/books",async (req,res)=>{
try{
    const book =await Book.create(req.body);
    return res.status(201).send(book)
}catch(e){
    return res.status(500).send({message:e.message,status:"Failed"})
}
});
// _______________SECTION crud______________
app.post("/sections",async(req,res)=>{
    try{
        const section =await Section.create(req.body);
        return res.status(201).send(section);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"});
    }
})

app.get("/sections",async (req,res)=>{
    try{
        const sections = await Section.find().lean().exec();
        return res.status(201).send(sections)
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"});
    }
  
});

app.get("/sections/:id",async(req,res)=>{
    try{
        const section =await Section.findById(req.params.id).lean().exec();
        res.status(201).send(section)
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
})
app.patch("/sections/:id",async(req,res)=>{
    try{
        const section =await Section.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        }).lean().exec();
        res.status(201).send(section)
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
})
app.delete("/sections/:id",async(req,res)=>{
    try{
        const section =await Section.findByIdAndDelete(req.params.id).lean().exec();
        res.status(201).send(section)
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
})



// author Crud 
app.get("/authors",async(req,res)=>{
    try{
        const authors =await Author.find().populate("user_id").lean().exec();
        return res.send(authors)
    }catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
      }
});
app.post("/authors",async(req,res)=>{
    try {
        const author = await Author.create(req.body);
    
        return res.status(201).send(author);
      } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
      }
});
app.get("/authors/:id",async (req,res)=>{
try{
    const author=await Author.findById(req.params.id).populate({ path: "user_id", select: "first_name" }).lean().exec();
    return res.status(201).send(author)
}catch(e){
    return res.status(500).send({message:e.message,status:"Failed"})
}
});
app.patch("/authors/:id",async (req,res)=>{
    try{
        const author=await Author.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        }).populate("user_id").lean().exec();
        return res.status(201).send(author)
    }catch(e){
        return res.status(500).send({message:e.message,status:"Failed"})
    }
    })
    app.delete("/authors/:id",async (req,res)=>{
        try{
            const author=await Author.findByIdAndDelete(req.params.id,{
                new:true,
            }).lean().exec();
            return res.status(201).send(author)
        }catch(e){
            return res.status(500).send({message:e.message,status:"Failed"})
        }
        });
// books crud 
app.p


 
// users crud
app.post("/users" ,async(req ,res)=>{
    try{
        const user= await User.create(req.body);
        return res.status(201).send(user);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"});
    }
})
// get 
app.get("/users",async(req,res)=>{
    try{
        const users =await User.find().lean().exec();
        return res.send({users})
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})
// get a single id
app.get ("/users/:id",async (req,res)=>{
    try{
        const user =await User.findById(req.params.id).lean().exec();
        return res.send(user)
    }catch(e){
        return res.status(500).json({message:e.message,status:"failed"})
    }
});
// patch Update
app.patch("/users/:id",async(req,res)=>{
    try{
        let user = await User.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        }).lean().exec();
        return res.status(201).send(user);
    }catch(e){
return res.status(501).json({message:e,message,status:"Failed"});
    }
});
// delete 
app.delete("/users/:id",async(req,res)=>{
    try{
        const user =await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(user);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"});
    }
})
app.listen(1234,async function(){
    await connect();
    console.log("listening on port 1234")

})