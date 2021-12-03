const { Schema ,model}= require("mongoose");
const mongoose =require("mongoose")
const gallerySchema =new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    pictures:[{type:String,required:true}]
   
},{
    versionKey:false,
    timestamps:true
});
module.exports =model("gallery",gallerySchema);