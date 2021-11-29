const mongoose=require("mongoose");
const citySchema =new mongoose.Schema({
    city_name:{type:String,required:true},
    state:{type:String,required:false}
},{
    versionKey:false,
    timestamps:true
})
module.exports=mongoose.model("city",citySchema);