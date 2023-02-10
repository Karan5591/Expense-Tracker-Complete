const express= require('express');
const router=require('./routes/index');
const axios= require('axios');
const cookieParser= require('cookie-parser')

const app=express();
app.use(cookieParser())
app.set('view engine', 'ejs')



app.use("/", router);
app.listen(3000);