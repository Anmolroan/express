const mongoose = require("mongoose");
const evaluationSchema =new mongoose.Schema({
    date_of_evaluation:{type:String,required:true},
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:false
        
    },
    
    topic_name:{type:String,required:false}
},{
    versionKey:false,
    timestamps:true
})
module.exports =mongoose.model("evaluation",evaluationSchema)