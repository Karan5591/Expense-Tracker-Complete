const express=require('express');
const path= require('path');




const app=express();

const signupData=((req, res)=>{
    res.sendFile('/New Complete Project/public/signup.html');
})

const dataAdd=((req, res)=>{
    res.send('Added Successfully');
})

module.exports=[signupData, dataAdd];