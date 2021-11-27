const express =require("express");
const app =express();
app.use(express.json());
const connect =require("./config/db")
const userController =require("./controllers/user.controller");
const studentController =require("./controllers/student.controller")
app.use("/users",userController);
app.use("/students",studentController)
app.listen(3000,async()=>{
    await connect();
    console.log("server is listening on 3000")
})