const express= require('express');
const bcrypt= require('bcrypt')
const bodyParser= require('body-parser')
const jwt=require('jsonwebtoken');
const dotenv= require('dotenv')
var Razorpay=require("razorpay");
dotenv.config();

const path=require("path")
const User= require("../models/users")
const Expense=require("../models/expenses");


const premiumUser=require("../models/premiumUser");

const sequelize = require('../util/database');
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

exports.RegisterUser=(async(req, res)=>{
    try
    {
        console.log(req.query);
        console.log(req.body);
        const name= req.body.name;
        const email= req.body.email;
        const password= req.body.password;
        const hashPassword=  await bcrypt.hash(password, 10)
        const promise= await new Promise( async(resolve, reject)=>
        {
           const emailCheck= await User.findOne({where:{ email: req.body.email}});
           
           if(emailCheck)
           {
            reject("Email Already Exist");
           }
           else
           {
            const userdata=User.create({name: name, email: email, password: hashPassword, ispremium: "False"});
           
            resolve("Registered Successfully");
           }
        
        })
        .then(response=>res.send(response))
        .catch(err=>res.send(err));
        
    }
    catch (err)
    {
        console.log(err);
    }
    
});

exports.Login=(async (req, res)=>{

    const promise= await new Promise(async (resolve, reject)=>
    {
        try
        {
            const emailCheck=await User.findOne({where:{email: req.body.email}})
            if(!emailCheck)
            {
                 reject("Wrong Email Entered");
            }
             else if(!await bcrypt.compare(req.body.password, emailCheck.password))
            {
                reject("Wrong password");
            }
            else
            {
                const token = jwt.sign(
                    { user_id: emailCheck.id },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: "1h",
                    }
                  );
                  resolve(res.cookie("jwtoken", token));
            }
        }
        catch (err)
        {
            console.log(err);
        }
    })
    .then(resolve=>res.send("<html><body><h1>Logged in successfully</h1><a href='/Expense'>Go to Expenses.</a></body></html>"))
    .catch(err=>res.send(err));
    
});

const rzp = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
  })

exports.PremiumMemeber=(async(req, res)=>{
    try{

        const resolve= await new Promise((resolve, reject)=>
        {
          const amount=2500;
      rzp.orders.create({amount: amount, currency: "INR"}, async(err, order)=>
      {
        console.log(order);
        if(err)
          {
            throw new Error(JSON.stringify(err));
          }
          else
          {
           await premiumUser.create({id: req.id, orderid: order.id, status:'pending', ispremium:'false'})
           {
            if(err)
            {
              console.log(err)
            }
            else
            {
              resolve([order.id, rzp.key_id])
            }
           }
        }
            
          })
        })
        .then(resolve=>{
            console.log(resolve),
            res.send(resolve)});
       
      }
      catch(err)
      {
        console.log(err);
    }

});

exports.MembershipPayment=(async(req, res)=>{

    const Pid=req.body.body.payment_id;
    await new Promise( async(resolve, reject)=>{
      try{ 
            if (Pid==0)
            {
                await premiumUser.update({paymentid:Pid, status:"Failed", ispremium:"False"}, {where:{id: req.id}}) 
                reject("Payment cancelled");
            }
              else 
            {
            await premiumUser.update({paymentid:Pid, status:"Successful", ispremium:"True"}, {where:{id: req.id}}) 
            resolve ("Payment Successful");
        }
    }
    catch(err){
        console.log(err);
      }
  
    })
    .then(resolve=>res.send(resolve))
    .catch(err=>res.send(err));
  })

exports.GetLeaderBoard=(async(req, res)=>{
    const response= new Promise((resolve, reject)=>{
        try
        {
                const data= Expense.findAll({
                attributes:['user_id', [sequelize.fn('sum', sequelize.col('amount')), 'total']],
                group: ['user_id'],
                raw: true,
                order: sequelize.literal('total DESC'),
                include: [{model: User, 
                  attributes: ['email', 'name']
                }],
            })
            
            resolve (data);
        }
        catch(err)
        {
            console.log(err);
        }
    })
    .then(data=>res.send(data));
    
})

