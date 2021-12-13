const express =require("express");
const app =express();

app.use(express.json());

const {register,login}=require("./controllers/auth.controller");

app.post("/register",register);

app.post("/login",login);

const movieController = require("./controllers/movie.controller");
app.use("/movie",movieController);

const theatreController = require("./controllers/theatre.controller");
app.use("/theatre",theatreController);

const screenController = require("./controllers/screen.controller");
app.use("/screen",screenController);

const showController =require("./controllers/show.controller");
app.use("/show",showController);

const seatController = require("./controllers/seat.controller");
app.use("/seat",seatController);
module.exports =app;