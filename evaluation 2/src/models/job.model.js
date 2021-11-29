const mongoose =require("mongoose");
const jobSchema =new mongoose.Schema({
    "name":{type:String,required:true},
    "skill_needed":{type:String,required:true},
    "job-type":{type:String,required:true},
    "rating":{type:Number,required:true},
    "notice_period_months":{type:Number,required:false},
    "city_id":{
        type:mongoose.Schema.Types.ObjectId,
        ref:"city",
        required:false
    },
    "company_id":{
        type:mongoose.Schema.Types.ObjectId,
        ref:"company",
        required:true
    }
},{
    versionKey:false,
    timestamps:true
})
module.exports=mongoose.model("job",jobSchema)