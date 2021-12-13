const express =require("express");
const Theatre =require("../models/theatre.model");


const router =express.Router();

router.post("/",async(req,res)=>{
try{
   const theatre = await Theatre.create(req.body)
   
    return res.status(201).json({theatre})
}catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }

});

router.get("/", async (req, res) => {
    const theatres = await Theatre.find().lean().exec();
  
    return res.send(theatres);
  });
  
  module.exports = router;