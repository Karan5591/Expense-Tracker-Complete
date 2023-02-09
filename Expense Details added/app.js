const express= require('express');
const router=require('./routes/index');
const axios= require('axios');

const app=express();
app.set('view engine', 'ejs')


app.use("/", router);
// app.use("/Expenses", router);
app.listen(3000);