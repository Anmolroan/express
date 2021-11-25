const mongoose =require("mongoose")

const authorSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    }
},{
    versionKey:false,
    timestamps:true,
});
// author model 
module.exports =mongoose.model("author",authorSchema);