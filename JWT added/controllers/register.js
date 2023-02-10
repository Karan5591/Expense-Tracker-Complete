const express=require('express');
const cookieParser= require('cookie-parser')
const db= require("../routes/db-config")
const bodyParser= require('body-parser')
const bcrypt=require('bcrypt');
const { expenseData } = require('./ExpenseData');
const jwt=require('jsonwebtoken');

const app=express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

exports.loginData= (req, res)=>{
    res.sendFile('/Expense-Tracker-Complete/JWT added/public/SignIn.html');
}

exports.signUp= (req, res)=>{
    res.sendFile('/Expense-Tracker-Complete/JWT added/public/register.html');
}

exports.registerUser= async(req, res)=>{
    
    const name=req.body.name;
    const email=req.body.email;
    const pass= req.body.password;

    try
    {
        const sql= "select Email from userdata where Email=?";
        db.query(sql, [email], async (err, data)=>{
            if(data.length>0)
                {
                    //res.redirect("/");
                    res.send(`<html><body><h2>Email already registered</h2> <br><br> <a href='/'>Go back to home</a></body></html>`);
                }
                else{
                    let hashPass= await bcrypt.hash(pass, 10);
                    const query="Insert into userdata (name, Email, password) values(?,?,?)";
            db.query(query, [name, email, hashPass], (err, data)=>{
                if(err)
                {
                    throw err;
                }
                res.send(`<html><body><h2>User Registered Successfully</h2> <br> <a href='/'>Home</a></body></html>`);   
                });
                
            }
           
        });
    }

    catch (err)
    {
        console.log(err);
    }
}

exports.check= (req, res)=>{
    const email=req.body.email;
    const pass= req.body.password;

    try
    {
        const sql= "select * from userdata where Email=?";
     db.query(sql, [email], async(err, data)=>{
        
        if (data.length<1)
                {
                    
                    res.json({
                        data:"Invalid email or password"
                    })  
                }
            
               else if (!await (bcrypt.compare(pass, data[0].password)))
               {
                res.json({
                    data:"Invalid email or password"
                })
               }
               
            
               
                else if(data[0].Email!=email)
                {
                    res.json({
                        data:"Invalid email or password"
                    })
                }
                else
                {   data[0].password=undefined;
                    const token=jwt.sign({data:data[0].ID}, process.env.JWT_SECRET,
                    {
                        expiresIn: "1h",
                        
                        
                    })

                    res.cookie("jwtoken", token, {
                        expiresIn: "1h",
                        httpOnly: true
                        
                    }).redirect("/Expenses");
                }                        
                    })
                }
            
        
    

    catch (err)
    {
        console.log(err);
    }
}






