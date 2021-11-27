const express =require("express");
const router =express.Router();
const Author =require("../model/author.model")

router.get("",async(req,res)=>{
    try{
        const authors =await Author.find().populate("user_id").lean().exec();
        return res.send(authors)
    }catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
      }
});
router.post("",async(req,res)=>{
    try {
        const author = await Author.create(req.body);
    
        return res.status(201).send(author);
      } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
      }
});
router.get("/:id",async (req,res)=>{
try{
    const author=await Author.findById(req.params.id).populate({ path: "user_id", select: "first_name" }).lean().exec();
    return res.status(201).send(author)
}catch(e){
    return res.status(500).send({message:e.message,status:"Failed"})
}
});
router.patch("/:id",async (req,res)=>{
    try{
        const author=await Author.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        }).populate("user_id").lean().exec();
        return res.status(201).send(author)
    }catch(e){
        return res.status(500).send({message:e.message,status:"Failed"})
    }
    })
    router.delete("/:id",async (req,res)=>{
        try{
            const author=await Author.findByIdAndDelete(req.params.id,{
                new:true,
            }).lean().exec();
            return res.status(201).send(author)
        }catch(e){
            return res.status(500).send({message:e.message,status:"Failed"})
        }
        });
        module.exports =router;