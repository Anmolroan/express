const express =require("express");
const City =require("../models/city.model");
const router = express.Router();

router.post("",async(req,res)=>{
    try{
        const city =await City.create(req.body)
        res.status(201).send(city)
        
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
    
})
router.get("",async(req,res)=>{
    try{
        const cities =await City.find().lean().exec();
        res.status(201).send(cities)
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
})
module.exports =router 