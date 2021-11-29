const express =require("express");

const connect =require("./config/db")
const app=express();
app.use(express.json());
// controllers 
const cityController=require("./controllers/city.controller");
const companyController=require("./controllers/company.controller");
const jobController =require("./controllers/job.controller")
app.use("/cities",cityController);
app.use("/companies",companyController);
app.use("/jobs",jobController)
app.listen(1234,async()=>{
    
    await connect();
    console.log("port is running on 1234");
})