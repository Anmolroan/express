const express =require("express");
const Show =require("../models/show.model");


const router =express.Router();

router.post("/",async(req,res)=>{
try{
   const show = await Show.create(req.body)
   
    return res.status(201).json({show})
}catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }

});

router.get("/", async (req, res) => {
    const shows = await Show.find().populate("screen_id").populate("movie_id").lean().exec();
  
    return res.send(shows);
  });
  router.get("/:movie",async(req,res)=>{
    const shows = await Show.find().populate("screen_id").populate("movie_id").lean().exec();
    const available=[];
    
    for(let i =0;i<shows.length;i++){
      console.log(shows[i].movie_id.name);
      if(shows[i].movie_id.name==req.params.movie){
        available.push(shows[i]);
      }
    }
    return res.send(available)
  });
  router.get("/:id/seats",async(req,res)=>{
    const shows = await Show.findById(req.params.id).populate("screen_id").populate("movie_id").lean().exec();
    console.log(req.params.id)
    
    // for(let i =0;i<shows.length;i++){
      
    //  console.log(shows[i].id)
    // }
    console.log(shows.total_seats);
    let arr=[]
    arr.push(shows.total_seats);
    return res.status(201).send(arr)
  });
  router.get("/:actors/movies",async(req,res)=>{
    const shows = await Show.find().populate("screen_id").populate("movie_id").lean().exec();
   

    
    // for(let i =0;i<shows.length;i++){
      
    //  console.log(shows[i].actors)
    // }
res.send(shows)
    
  });
  router.get("/:number/seats",async(req,res)=>{
    const shows = await Show.find().populate("screen_id").populate("movie_id").lean().exec();
    const available=[];
    
    for(let i =0;i<shows.length;i++){
      console.log(shows[i].total_seats);
      if(shows[i].total_seats>=0(+req.params.number)){
        available.push(shows[i]);
      }
    }
    return res.send(shows)
  });
  module.exports = router;