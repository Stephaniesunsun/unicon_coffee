const express=require('express');
const router=express.Router();
//do  some login here
router.get('/',(req,res)=>{
    res.redirect('cat');
})

module.exports=router;