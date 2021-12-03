const express =require("express");
const router =express.Router();
const User = require("../models/user.model");
const upload =require("../middlewarws/upload");
const fs = require('fs')
router.post("/",upload.single("profile_pic"),async(req,res)=>{
    try{
        const user = await User.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            profile_pic:req.file.path
        });
        return res.status(201).send(user)
    }catch(e){
        return res.status(500).send({messge:e.message,status:"Failed"})
    }
});
router.get("/",async(req,res)=>{
    try{
        const users =await User.find().lean().exec();
        res.status(201).send(users)
    }catch(e){
        return res.status(500).send({messge:e.message,status:"Failed"})
    }
});
router.patch("/:id",upload.single("profile_pic"),async(req,res)=>{
    try{

        const t=await User.findById(req.params.id);
        console.log(t)
    if(req.file.path){
        const user =await User.findByIdAndUpdate(req.params.id,{ $set:{profile_pic:req.file.path}});
        fs.unlinkSync(t.profile_pic)
    }
    if(req.body.first_name){
        const user =await User.findByIdAndUpdate(req.params.id,{ $set:{first_name:req.body.first_name}});
    }
    if(req.body.last_name){
        const user =await User.findByIdAndUpdate(req.params.id,{ $set:{last_name:req.body.last_name}});
    }
    res.status(201).send(await User.findById(req.params.id))
}catch(e){
    return res.status(500).send({message:e.message,status:"Failed"})
}
})
router.delete("/:id",async(req,res)=>{
    try{

        const t=await User.findById(req.params.id);
        fs.unlinkSync(t.profile_pic)
        const user =await User.findByIdAndDelete(req.params.id,{
            new:true
        });
        
   
    res.status(201).send(user)
}catch(e){
    return res.status(500).send({message:e.message,status:"Failed"})
}
})
module.exports =router;