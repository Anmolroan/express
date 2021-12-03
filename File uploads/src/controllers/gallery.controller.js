const express =require("express");
const router =express.Router();
const Gallery =require("../models/gallery.model");
const upload = require("../middlewarws/upload");
const fs = require('fs')
router.post("/multiple",upload.any("Images"),async(req,res)=>{
    const filePaths =req.files.map(file=>file.path)
    try{
        const gallery = await Gallery.create({
            user_id:req.body.user_id,
            
            pictures:filePaths
        });
        return res.status(201).send(gallery)
    }catch(e){
        return res.status(500).send({messge:e.message,status:"Failed"})
    }
});
router.get("/",async(req,res)=>{
    try{
        const galleries =await Gallery.find().lean().exec();
        res.status(201).send(galleries)
    }catch(e){
        return res.status(500).send({messge:e.message,status:"Failed"})
    }
});

router.delete("/:id",async(req,res)=>{
    try{

        const t=await Gallery.findById(req.params.id);
        fs.unlinkSync(t.pictures)
        const gallery = await Gallery.findByIdAndDelete(req.params.id,{
            new:true
        });
        
   
    res.status(201).send(gallery)
}catch(e){
    return res.status(500).send({message:e.message,status:"Failed"})
}
})
module.exports =router;