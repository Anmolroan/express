const express =require("express");
const app =express();

app.use(express.json())
const productController =require("./controllers/product.controller");
const userController =require("./controllers/user.controller");
const galleryController =require("./controllers/gallery.controller")
app.use("/products",productController);
app.use("/users",userController);
app.use("/gallery",galleryController)
module.exports =app;