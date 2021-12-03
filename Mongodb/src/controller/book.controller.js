// ------------Books Crud-------------------
const express =require("express");
const router =express.Router();
const Book =require("../model/book.model");
const User =require("../model/user.model");

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
            const books = await Book.find().populate("section_id")
            .populate(
                {
                    path: 'author_id',
                    populate: {
                      path: 'user_id',
                      model: User
                    }
                }
            )
            .lean().exec();
            res.status(201).send(books)
        }catch(e){
            res.status(500).send({message:e.message,status:"Failed"})
        }
    });

    // check out the books
    router.get("/checkout",async(req,res)=>{
        try{
            const books =await Book.find({checked_out:{$eq:true}});
            
            res.status(201).send(books)
        }catch(e){
            res.status(500).send({message:e.message,status:"Failed"})
        }
    });
//    find books in a section

router.get("/:title",async(req,res)=>{
    try{
      
        const book = await Book.find().populate("section_id")
        .populate(
            {
                path: 'author_id',
                populate: {
                  path: 'user_id',
                  model: User
                }
            }
        )
        .lean().exec();
        let arr=[]
        for(let i =0;i<book.length;i++){
            if(book[i].section_id.title==req.params.title){
                arr.push( book[i])
            }
         
        }
        res.status(201).send(arr)
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
});


// find books that are not checked out
router.get("/:title/checkout",async(req,res)=>{
    try{
      
        const book = await Book.find().populate("section_id")
        .populate(
            {
                path: 'author_id',
                populate: {
                  path: 'user_id',
                  model: User
                }
            }
        )
        .lean().exec();
        let arr=[]
        for(let i =0;i<book.length;i++){
            if(book[i].section_id.title==req.params.title){
                arr.push( book[i])
            }
         
        }
        let arr2=[]
        for(let i =0;i<arr.length;i++){
if(arr[i].checked_out!=="true"){
    arr2.push(arr[i])
}
        }
        res.status(201).send(arr2)
    }catch(e){
        res.status(500).send({message:e.message,status:"Failed"})
    }
});

//

    router.get("/:author",async(req,res)=>{
        try{
            // let check =req.params.author_id.user_id.first_name;
            // console.log(check);
            let books= await Book.find().populate("section_id")
            .populate(
                {
                    path: 'author_id',
                    populate: {
                      path: 'user_id',
                      model: User
                    }
                }
            );
            let arr=[]
             for(let i =0;i<books.length;i++){
                if(books[i].author_id.user_id.first_name+" "+books[i].author_id.user_id.last_name==req.params.author){
                    arr.push(books[i].book_name)
                };
             }
           
           
            
            res.status(201).send(books)
        }catch(e){
            res.status(500).send({message:e.message,status:"Failed"})
        }
    })


    // author name inside a section
    router.get("/:author/:section",async(req,res)=>{
        try{
            // let check =req.params.author_id.user_id.first_name;
            // console.log(check);
            let books= await Book.find().populate("section_id")
            .populate(
                {
                    path: 'author_id',
                    populate: {
                      path: 'user_id',
                      model: User
                    }
                }
            );
            let arr=[]
             for(let i =0;i<books.length;i++){
                if(books[i].author_id.user_id.first_name+" "+books[i].author_id.user_id.last_name==req.params.author&&books[i].section_id.title==req.params.section){
                    arr.push(books[i])
                };
             }
           
           
            
            res.status(201).send(arr)
        }catch(e){
            res.status(500).send({message:e.message,status:"Failed"})
        }
    })
    //

   
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