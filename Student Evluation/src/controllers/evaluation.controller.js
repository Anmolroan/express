const express =require("express");
const Evaluation =require("../models/evaluation.model");
const router =express.Router();
router.post("",async(req,res)=>{
    try{
        const evaluation=await Evaluation.create(req.body);
        return res.status(201).send(evaluation)
    }catch(e){
        return res.status(500).send({message:e.message,status:"Failed"});
    }
});
router.get("",async(req,res)=>{
    try{
const evaluations =await Evaluation.find().populate("user_id").lean().exec();
return res.status(201).send(evaluations)
    }catch(e){
        return res.status(500).send({message:e.message,status:"Failed"});
    }
})
module.exports=router