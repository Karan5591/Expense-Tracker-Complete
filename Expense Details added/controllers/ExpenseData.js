const { response } = require('express');
const express= require('express')
const db= require("../routes/db-config")

const app=express();

exports.getAllData= (req, res)=> {
          
            const query = "SELECT * FROM expensedata;";
            db.query(query, (err, result) =>{
                res.render("read.ejs",{result});
           
    
});
}


exports.expenseData=((req, res)=>{
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;

    const sql="Insert into expensedata (Amount, Description, Category) values(?,?,?)";
    db.query(sql, [amount, description, category], (err, data)=>{
        if(err)
        {
            throw err;
        }
        res.send(`<html><body><h2>Data Entered Successfully</h2> <br> <a href='/Expenses'>Home</a></body></html>`);   
        });
    
});