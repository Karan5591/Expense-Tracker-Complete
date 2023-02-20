const express= require('express');
const expenses= require('../models/expenses');
const users=require('../models/users')


const app= express();

exports.GetAllData= (async (req, res)=>{

    try
    {   
        const promise= await new Promise((resolve, reject)=>{
           const expenseData= users.findAll({
            attributes:['ispremium'],
            include: [{model: expenses, attributes: ['productid', 'amount', 'description', 'category']}],
            where:{id:req.id},
        });
           resolve(expenseData);
        })
        .then (resolve=>res.send(resolve));

    }
    catch (err)
    {
        console.log(err);
    }
})

exports.insertData= (async (req, res)=>{
        const amount=req.body.amount;
    const description= req.body.description;
    const category= req.body.category;
    const userid=req.id;

    try
    {   
        const promise= await new Promise(async (resolve, reject)=>{

            
            const insertData= await expenses.create({amount: amount, description:description, category: category, user_id: req.id})
           resolve(insertData);
            })
       
        .then (resolve=>res.redirect("/Expense"));

    }
    catch (err)
    {
        console.log(err);
    }
})

exports.deleteData= (async (req, res)=>{
    const id= req.params.id
    const row = await expenses.findOne({
        where: { productid: id },
      });
      
      if (row) {
        await row.destroy(); // deletes the row
      }
      res.send("Data Deleted");
    //console.log(req.params.id);
})

exports.updateData= (async (req, res)=>{
    const amount=req.body.amount;
    const description= req.body.description;
    const category= req.body.category;
    const productid=req.body.productid;

    try
    {   
        const promise= await new Promise(async (resolve, reject)=>{
           const insertData= await expenses.update({amount: amount, description:description, category: category}, {where:{productid: productid} } )
           resolve(insertData);
           
        })
        .then (resolve=>res.send("Data Added Successfully"));

    }
    catch (err)
    {
        console.log(err);
    }
})