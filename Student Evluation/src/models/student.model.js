const mongoose =require("mongoose");
const studentSchema = new mongoose.Schema({
    roll_no:{type:Number,required:true},
    current_batch:{type:String,required:true},
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
});
module.exports =mongoose.model("student",studentSchema)