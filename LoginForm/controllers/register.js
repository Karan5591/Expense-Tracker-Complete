const express=require('express');
const path= require('path');
const db= require("../routes/db-config")
const bodyParser= require('body-parser')

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

exports.loginData= (req, res)=>{
    res.sendFile('/Expense Tracker Complete/LoginForm/public/SignIn.html');
}

exports.check= async(req, res)=>{
    const email=req.body.email;
    const pass= req.body.password;

    try
    {
        const sql= "select * from userdata where Email=?";
     db.query(sql, [email], (err, data)=>{
        console.log(data);
            if(data[0].email!=email && data[0].password!=pass)
                {
                    res.send(`<html><body><h2>Incorrect email or Password</h2> <br><br> <a href='/'>Go back to home</a></body></html>`);
                }
                else{
                    
                res.send(`<html><body><h2>Login Successfully</h2> <br> <a href='/'>Home</a></body></html>`);   
                };
            });
           
        }  
    

    catch (err)
    {
        console.log(err);
    }
}






