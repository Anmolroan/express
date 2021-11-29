// ------------Books Crud-------------------
const express =require("express");
const router =express.Router();
const Book =require("../model/book.model")
router.post("",async (req,res)=>{
    try{
        const book =await Book.create(req.body);
        return res.status(201).send(book)
    }catch(e){
        return res.status(500).send({message:e.message,status:"Failed"})
    }
    });
    router.get("",async(req,res)=>{
        try{
            const books = await Book.find().populate("section_id").populate("author _id").lean().exec();
            res.status(201).send(books)
        }catch(e){
            res.status(500).send({message:e.message,status:"Failed"})
        }
    });
    router.get("/:id",async (req,res)=>{
        try{
            const book =await Book.findById(req.params.id).populate("section_id").populate("author_id").lean().exec();
            res.status(201).send(book)
        }catch(e){
            res.status(500).send({message:e.message,status:"Failed"})
        }
    });
    router.patch("/:id",async(req,res)=>{
       try{
        const book= await Book.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        }).lean().exec()
        return res.status(201).send(book)
       }catch(e){
           return res.status(500).send({message:e.message,status:"Failed"})
       }
    })
    router.delete("/:id",async(req,res)=>{
        try{
         const book= await Book.findByIdAndDelete(req.params.id,req.body).lean().exec()
         return res.status(201).send(book)
        }catch(e){
            return res.status(500).send({message:e.message,status:"Failed"})
        }
     })
     module.exports =router