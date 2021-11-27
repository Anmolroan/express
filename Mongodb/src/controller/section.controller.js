const express =require("express");
const Section = require("../model/section.model")
const router =express.Router();

router.post("",async(req,res)=>{
    try{
        const section =await Section.create(req.body);
        return res.status(201).send(section);
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"});
    }
})

router.get("",async (req,res)=>{
    try{
        const sections = await Section.find().lean().exec();
        return res.status(201).send(sections)
    }catch(e){
        return res.status(500).json({message:e.message,status:"Failed"});
    }
  
});

router.get("/:id",async(req,res)=>{
    try{
        const section =await Section.findById(req.params.id).lean().exec();
        res.status(201).send(section)
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
})
router.patch("/:id",async(req,res)=>{
    try{
        const section =await Section.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        }).lean().exec();
        res.status(201).send(section)
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
})
router.delete("/:id",async(req,res)=>{
    try{
        const section =await Section.findByIdAndDelete(req.params.id).lean().exec();
        res.status(201).send(section)
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
})


module.exports = router;