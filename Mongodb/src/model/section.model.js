const mongoose =require("mongoose");
const sectionSchema =new mongoose.Schema({
    title :{ type:String,required:true },
    
    },{
        versionKey:false,
        timestamps:true,
    });
    // section model
    module.exports =mongoose.model("section",sectionSchema);