const express =require("express");
const Student =require("../models/student.model");
const router =express.Router();

router.post("",async(req,res)=>{
    try{
        const student = await Student.create(req.body);
        return res.status(201).send(student)
    }catch(e){
        return res.status(500).send({message:e.message,status:"Failed"});
    }
})

// get 
router.get("",async(req,res)=>{
    try{
        const students =await Student.find().populate("user_id").populate("evaluation_id").lean().exec();
        return res.status(201).send(students)
    }catch(e){
        return res.status(500).send({message:e.message,status:"Failed"})
    }
})
router.get("/dsa",async(req,res)=>{
    try{
        const students =await Student.find().populate("user_id").populate("evaluation_id").lean().exec();
        const arr=[]
        for(let i =0;i<students.length;i++){
            if( students[i].evaluation_id!==undefined){
                if(students[i].evaluation_id.topic_name=="DSA"){
                    arr.push(students[i])
                }
            }
            
            // if(students[i].eva)
        }
return res.status(201).send(arr)
    }catch(e){
        return res.status(500).send({message:e.message,status:"Failed"})
    }
});
router.get("/coding",async(req,res)=>{
    try{
        const students =await Student.find().populate("user_id").populate("evaluation_id").lean().exec();
        const arr=[]
        for(let i =0;i<students.length;i++){
            if( students[i].evaluation_id!==undefined){
                if(students[i].evaluation_id.topic_name=="coding"){
                    arr.push(students[i])
                }
            }
            
            // if(students[i].eva)
        }
return res.status(201).send(arr)
    }catch(e){
        return res.status(500).send({message:e.message,status:"Failed"})
    }
});
router.get("/highest_marks",async(req,res)=>{
    try{
        const students =await Student.find().populate("user_id").populate("evaluation_id").lean().exec();
        const arr=[];
        let max=null;
        let topper=null;
        for(let i =0;i<students.length;i++){
            if( students[i].marks!==undefined){
                if(max==null||max<students[i].marks){
                    max=students[i].marks;
                    topper=students[i]
                }
            }
            
            // if(students[i].eva)
        }
return res.status(201).send(topper)
    }catch(e){
        return res.status(500).send({message:e.message,status:"Failed"})
    }
})
router.get("/:id",async(req,res)=>{
    try{
        const student = await Student.findById(req.params.id).populate("user_id").lean().exec();
        return res.status(201).send(student)
    }catch(e){
        return res.status(500).send({message:e.message,status:"Failed"})
    }
})
router.patch("/:id",async(req,res)=>{
    try{
const student =await Student.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
}).lean().exec();
return res.status(201).send(student);
    }catch(e){
        return res.status(500).send({message:e.message,status:"Failed"})
    }
});
router.delete("/:id",async(req,res)=>{
    try{
const student  = await Student.findByIdAndDelete(req.params.id).lean().exec();
return res.status(201).send(student)
    }catch(e){
        return res.status(500).send({message:e.message,status:"Failed"})
    }
})
module.exports=router;