const mongoose =require("mongoose");
const bookSchema =new mongoose.Schema({
    book_name:{type:String,required:true},
    published_year:{type:Number,required:true},
    section_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"section",
        required:true,
    },
    author_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"author",
        required:true,
    }
},{
    versionKey:false,
    timestamps:true,
});
// book model
module.exports =mongoose.model("book",bookSchema)