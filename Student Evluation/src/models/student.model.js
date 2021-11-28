const mongoose =require("mongoose");
const studentSchema = new mongoose.Schema({
    roll_no:{type:Number,required:true},
    marks:{type:Number,required:false},
    current_batch:{type:String,required:true},
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    evaluation_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"evaluation",
        required:true
    },
  
});
module.exports =mongoose.model("student",studentSchema)