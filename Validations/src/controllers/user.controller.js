const express=require("express");
const router =express.Router();
const User =require("../models/user.model");

const { body, validationResult } = require('express-validator')

router.get("/",async(req,res)=>{
    try{
    
        const users =await User.find()
        .lean()
        .exec();;
       
      
     
        return res.status(201).send(users)
    }catch(e){
       return  res.status(500).send({message:e.message,status:"Failed"})
    }
    
});
// (from ,to,subject,text,html)
router.post("/",body("first_name").isLength({ min: 6,max:20 }).withMessage("First name is required"),
body("last_name").isLength({ min: 1,max:20 }).withMessage("Last name is required"),
body("email").isEmail().withMessage("email is not valid"),
body("pincode").isLength({ min: 6,max:6 }).withMessage("pincode should be of 6 characters"),
body("age").custom(value=>{
    if(value<0||value>100){
        throw new Error("Age can not be more than 100 or less than 0")
    }
    return true;
}),
body("gender").isLength({ min: 3,max:20 }).withMessage("gender is not defined"),
async(req,res)=>{
    try{
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
        const user=await User.create(req.body);
        
    
   
        return res.status(201).send(user)
    }catch(e){
       return  res.status(500).send({message:e.message,status:"Failed"})
    }
})

module.exports =router;