const express =require("express");
const Job =require("../models/job.model");
const router =express.Router();
const Company =require("../models/company.model")
router.post("",async(req,res)=>{
    try{
        const job =await Job.create(req.body)
        res.status(201).send(job)
        
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
    
});
router.get("",async(req,res)=>{
    try{
        const jobs =await Job.find().populate("city_id").populate("company_id").lean().exec();
        res.status(201).send(jobs)
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
});
router.get("/:skill/:city",async(req,res)=>{
    try{
        const jobs =await Job.find().populate("city_id").lean().exec();
        let arr =[];
        for(let i =0;i<jobs.length;i++){
            if(jobs[i].skill_needed==req.params.skill&&jobs[i].city_id.city_name===req.params.city){
                arr.push(jobs[i])
            }
        }
        res.status(201).send(arr)
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
});
// have to correct
router.get("/e",async(req,res)=>{
    try{
        const jobs =await Job.find().populate("city_id").lean().exec();
        let arr =[];
        
            for(let i =0;i<jobs.length;i++){
                if(jobs[i].job-type!=undefined){
                    if(jobs[i].job-type!="Full-time"){
                        arr.push(jobs[i])
                    }
                }
               
            }
           
            
        
        res.status(201).send(arr)
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
});
router.get("/notice_period",async(req,res)=>{
    try{
        const jobs =await Job.find().populate("city_id").lean().exec();
        let arr =[];
        for(let i =0;i<jobs.length;i++){
           
                if(jobs[i].notice_period_months<=2){
                    arr.push(jobs[i])
                }
            
           
            
        }
        res.status(201).send(arr)
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
});

router.get("/ratings",async(req,res)=>{
    try{
        const jobs =await Job.find().populate("city_id").lean().exec();
        let arr =jobs;
        function swap(i,j){
            let temp =jobs[i];
            jobs[i]=jobs[j];
            jobs[j]=temp
        }
      for(let i =0;i<jobs.length-1;i++){
          for(let j =0;j<jobs.length-1-i;j++){
              if(jobs[j].rating>jobs[j+1].rating){
swap(j,j+1)
              }
          }
      }
       
        res.status(201).send(jobs)
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
});
router.get("/most_jobs",async(req,res)=>{
    try{
        const jobs =await Job.find().populate("city_id").lean().exec();
        var obj={}
        for(let i =0;i<jobs.length;i++){
        
            var char =jobs[i].company_id
        
           if(obj[char]==undefined){
               obj[char]=1;
           }else{
               obj[char]=obj[char]+1
           }
            
        }
        var max=null;
        var maximum =null;
        for(key in obj){
            if(max==null||obj[key]>max){
                max=obj[key];
                maximum=key
            }
        }
        const check =await Company.find().lean().exec();
        for(let i =0;i<check.length;i++){
            if(check[i]._id==maximum){
                var maximum_open_jobs=check[i]
            }
        }
       
        res.status(201).send({maximum_open_jobs})
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
});
module.exports =router;