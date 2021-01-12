 const express=require('express');
 const router=express.Router();
 //inport the Cat model
 const Cat=require('../models/cat');


 // all cat route
router.get('/',async (req,res)=>{ //will be /cat.specified in server.js
    let searchOptions={};
    if(req.query.name!=null && req.query.name!=''){
        searchOptions.name=new RegExp(req.query.name,'i');
    }
    try{
        const cats=await Cat.find({searchOptions});
        res.render('cat/index',{
            cat:cats,
            searchOptions:req.query
        })//pass 'cat' to cat/index
    }catch{
        res.redirect('/')//to the homepage
    }
})
 //new cat route
router.get('/new',(req,res)=>{//just a redirect
    res.render('cat/new',{category:new Cat()});//pass an new cat object to cat/new,show the user the form.
})
 //(after) create author route (after the sumbit button inside the form in cat/new)
router.post('/',async (req,res)=>{
    const category=new Cat({name:req.body.name});//pass in an object into the class instance,create a document
   try{
     const newCat=await category.save();
     res.redirect('cat');
   }catch{
    res.render('cat/new',{
        category:category,//'category'in the form=category just created.
        errorMessage:'error creating category'
    })
   }
})
 //dont forget to export
 module.exports=router;