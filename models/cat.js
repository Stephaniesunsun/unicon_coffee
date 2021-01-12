const mongoose=require('mongoose');

//create schema (table)
const catSchema=new mongoose.Schema({
    //create json objects
    name:{
        type:String, //type and required is the most common for schema setup
        required:true
    }
})

module.exports=mongoose.model('Cat',catSchema);