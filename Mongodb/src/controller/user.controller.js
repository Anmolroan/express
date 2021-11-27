const express =require("express");
const User = require("../model/user.model")
const router =express.Router();


router.post("" ,async(req ,res)=>{
    try{
        const user= await User.create(req.body);
        return res.status(201).send(user);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"});
    }
})
// get 
router.get("",async(req,res)=>{
    try{
        const users =await User.find().lean().exec();
        return res.send({users})
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"})
    }
})
// get a single id
router.get ("/:id",async (req,res)=>{
    try{
        const user =await User.findById(req.params.id).lean().exec();
        return res.send(user)
    }catch(e){
        return res.status(500).json({message:e.message,status:"failed"})
    }
});
// patch Update
router.patch("/:id",async(req,res)=>{
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
router.delete("/:id",async(req,res)=>{
    try{
        const user =await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(user);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"});
    }
})
module.exports =router 