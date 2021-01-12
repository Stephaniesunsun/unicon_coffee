if(process.env.NODE_ENV !=='production'){
    require('dotenv').config();
}

const express=require('express');
const app=express();
const expressLayouts=require('express-ejs-layouts');
const bodyParser=require('body-parser');

app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))
//connect to mongodb
const mongoose=require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true});//need dotenv
const db=mongoose.connection;
db.on('error',error=>console.error(error));
db.once('open',error=>console.log('connected to mongoose'));


const indexRouter=require('./routes/index');
const catRouter=require('./routes/cat');
app.use('/',indexRouter);
app.use('/cat',catRouter);


app.listen(process.env.PORT || 3000);