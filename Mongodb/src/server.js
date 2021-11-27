
const connect = require("./config/db");

const express =require("express");



// importing controller 
const authorController =require ("./controller/author.controller");

const bookController =require ("./controller/book.controller");
const sectionController =require("./controller/section.controller")
const userController =require("./controller/user.controller");

const app =express();
app.use(express.json());

 
app.use("/authors",authorController);
app.use("/books",bookController);
app.use("/sections",sectionController);
app.use("/users",userController);
app.listen(1234,async function(){
    await connect();
    console.log("listening on port 1234")

})