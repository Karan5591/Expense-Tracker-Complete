const express=require('express');
const path= require('path');
const db= require("../routes/db-config")
const bodyParser= require('body-parser')

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

exports.loginData= (req, res)=>{
    res.sendFile('/Expense-Tracker-Complete/LoginFormWithAPI/public/SignIn.html');
}

exports.check= async(req, res)=>{
    const email=req.body.email;
    const pass= req.body.password;

    try
    {
        const sql= "select * from userdata where Email=?";
     db.query(sql, [email], (err, data)=>{
        console.log(data.length);
        if (data.length<1)
                {
                    
                    res.sendStatus(404);   
                }
            
               else if (data[0].password!=pass)
               {
                res.sendStatus(401);   
                           }
                else if(data[0].Email!=email)
                {
                    res.send(`<html><body><h2>Incorrect email</h2> <br><br> <a href='/'>Go back to home</a></body></html>`);
                }
                else{
                    res.send("<html><body><h2>Logged in Successfull</h2> <br><br> <a href='/'>Go to home</a></body></html>")
                }
            });
           
        }  
    

    catch (err)
    {
        console.log(err);
    }
}






