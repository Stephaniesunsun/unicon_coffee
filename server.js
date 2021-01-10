if(process.env.NODE_ENV !=='production'){
    require('dotenv').config();
}

const express=require('express');
const app=express();
const expressLayouts=require('express-ejs-layouts');

app.set('view engine','ejs');
app.set('view',__dirname+'/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
//connect to mongodb
const mongoose=require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true});//need dotenv
const db=mongoose.connection;
db.on('error',error=>console.error(error));
db.once('open',error=>console.log('connected to mongoose'));


const indexRouter=require('./routes/index');
app.use('/',indexRouter);


app.listen(process.env.PORT || 3000);