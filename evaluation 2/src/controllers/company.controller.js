const express =require("express");
const Company =require("../models/company.model");
const router = express.Router();

router.post("",async(req,res)=>{
    try{
        const company =await Company.create(req.body)
        res.status(201).send(company)
        
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
    
})
router.get("",async(req,res)=>{
    try{
        const companies =await Company.find().populate("city_id").lean().exec();
        res.status(201).send(companies)
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
});
router.get("/:id",async(req,res)=>{
    try{
        const company =await Company.findById(req.params.id).populate("city_id").lean().exec();
        res.status(201).send(company)
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
})
module.exports =router;