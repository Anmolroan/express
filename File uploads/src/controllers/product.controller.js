const express =require("express");
const router =express.Router();
const Product =require("../models/product.model");
const upload = require("../middlewarws/upload")
router.post("/",upload.single("productImages"),async(req,res)=>{
    try{
        const product = await Product.create({
            name:req.body.name,
            price:req.body.price,
            image_urls:req.file.path
        });
        return res.status(201).send(product)
    }catch(e){
        return res.status(500).send({messge:e.message,status:"Failed"})
    }
});
router.post("/multiple",upload.any("productImages"),async(req,res)=>{
    const filePaths =req.files.map(file=>file.path)
    try{
        const product = await Product.create({
            name:req.body.name,
            price:req.body.price,
            image_urls:filePaths
        });
        return res.status(201).send(product)
    }catch(e){
        return res.status(500).send({messge:e.message,status:"Failed"})
    }
});
module.exports =router;