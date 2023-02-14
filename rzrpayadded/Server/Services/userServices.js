const express=require('express');
const cookieParser= require('cookie-parser')
const db = require('../Services/dbservice');
const bodyParser= require('body-parser')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const connection= require('./database')
const dotenv= require('dotenv')
dotenv.config()


const app=express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

exports.check= (req, res)=>{
    const email=req.body.email;
    const pass= req.body.password;

    try
    {
        const sql= "select * from userdata where email=?";
    connection.query(sql, [email], async(err, data)=>{
        if (data.length<1)
                {
                    
                    res.json({
                        data:"Invalid email or password"
                    })  
                }
            
               else if (!await (bcrypt.compare(pass, data[0].password)))
               {
                res.json({
                    data:"Invalid password"
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
                        
                    }).sendFile('/Practice/Client/ExpensePage.html');
                }                        
                    })
                }
            
        
    

    catch (err)
    {
        console.log(err);
    }
}