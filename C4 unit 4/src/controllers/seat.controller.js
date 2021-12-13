const express =require("express");
const Seat =require("../models/seat.model");


const router =express.Router();

router.post("/",async(req,res)=>{
try{
   const seat = await Seat.create(req.body)
   
    return res.status(201).json({seat})
}catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }

});

router.get("/", async (req, res) => {
    const seats = await Seat.find().populate("show_id").lean().exec();
  
    return res.send(seats);
  });
  router.get("/:number", async (req, res) => {
    const seats = await Seat.find().populate("show_id").lean().exec();
  for(let i =0;i<seats.length;i++){
    if(seats[i].show_id.seats<(+req.params.number)){
      arr.push(seats[i])
    }
  }
    return res.send(seats);
  });
  
  module.exports = router;