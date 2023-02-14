const express= require('express');
const cors=require('cors')
const routes= require('./Server/Router/routes')
const path= require('path')
const cookieParser= require('cookie-parser')
const { response } = require('express');
const app=express();
app.use(cors());
app.use(cookieParser());



app.use("/", routes);

app.listen((process.env.PORT), (req, res)=>{
    console.log("Server Started");
});