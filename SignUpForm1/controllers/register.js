const express=require('express');
const path= require('path');
const db= require("../routes/db-config")
const bodyParser= require('body-parser')

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

exports.signupData=((req, res)=>{
    res.sendFile('/Expense-Tracker-Complete/SignUpForm1/public/register.html');
})

exports.check= async(req, res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const pass= req.body.password;

    try
    {
        const sql= "select Email from userdata where Email=?";
        db.query(sql, [email], (err, data)=>{
            console.log(data);
            console.log(email);
            if(data.length>0)
                {
                    //res.redirect("/");
                    res.send(`<html><body><h2>Email already registered</h2> <br><br> <a href='/'>Go back to home</a></body></html>`);
                }
                else{
                    const query="Insert into userdata (name, Email, password) values(?,?,?)";
            db.query(query, [name, email, pass], (err, data)=>{
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






// exports.check=((req, res)=>{
//     const name=req.body.name;
//     const email=req.body.email;
//     const pass= req.body.password;
// db.connect(async (err)=>{
//         const sql= "select * from userdata";
//         db.query(sql, 
            
            
//            const emailData= (err, data)=>{
//         for(var i=0; i<data.length;i++)
//             {
//                 if(data[i].Email==email)
//                 {
//                     res.send("Email already exist");
//                 }
           
//         }
//         await function addData()
//         {
//             const promise= new Promise(reject, resolve)
//             {
//         const query="Insert into userdata (name, Email, password) values(?,?,?)";
//             db.query(query, [name, email, pass], (err, data)=>{
//                 if(err)
//                 {
//                     throw err;
//                 }
//                return resolve("Registered");
//             })
//         }
//     }
//     })  
//     })
// })
    


//module.exports=[signupData, dataAdd];