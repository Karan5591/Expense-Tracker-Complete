const { response } = require('express');
const express= require('express')
const db= require("../routes/db-config")
const cookieParser= require('cookie-parser')
const jwt= require('jsonwebtoken');


const app=express();
app.use(cookieParser());


exports.getAllData=  (req, res)=> {
    const token= req.cookies.jwtoken;
    const ver= jwt.verify(token, process.env.JWT_SECRET);
        id=ver.data;
          
            const query = "SELECT * FROM expensedata where ID=?";
            db.query(query,[id], (err, result) =>{
                res.render("read.ejs",{result});
           
    
});
}
exports.expenseData=((req, res)=>{
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;
    const token= req.cookies.jwtoken;
    const ver= jwt.verify(token, process.env.JWT_SECRET);
        id=ver.data;

    const sql="Insert into expensedata (ID, Amount, Description, Category) values(?,?,?,?)";
    db.query(sql, [id, amount, description, category], (err, data)=>{
        if(err)
        {
            throw err;
        }
        res.send(`<html><body><h2>Data Entered Successfully</h2> <br> <a href='/Expenses'>Home</a></body></html>`);   
        });
    
});
exports.deleteData=  (req, res)=> {

            const id=req.query.expenseID;
            
        
            const query = "delete from expensedata where expenseID=?";
            db.query(query,[id], (err, result) =>{
                res.redirect("/Expenses");
            })
        }