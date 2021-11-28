const express =require("express");
const app =express();
app.use(express.json());
const connect =require("./config/db")
const userController =require("./controllers/user.controller");
const studentController =require("./controllers/student.controller");
const evaluationController=require("./controllers/evaluation.controller")
app.use("/users",userController);
app.use("/students",studentController);
app.use("/evaluations",evaluationController)
app.listen(3000,async()=>{
    await connect();
    console.log("server is listening on 3000")
})