const mongoose=require("mongoose");
const companySchema =new mongoose.Schema({
    company_name:{type:String,required:true},
    state:{type:String,required:false},
    status:{type:String,required:true},
    turn_over:{type:Number,required:false},
    city_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"city",
        required:true
    }
},{
    versionKey:false,
    timestamps:true
})
module.exports=mongoose.model("company",companySchema);