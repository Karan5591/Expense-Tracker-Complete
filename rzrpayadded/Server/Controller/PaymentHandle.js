const express = require("express");
const connection= require('../Services/database')
var dotenv= require('dotenv')
var app = express();
var cors=require('cors');
var Razorpay=require("razorpay");
var bodyParser = require('body-parser')
app.use(cors());
const instance=null;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
dotenv.config();


const rzp = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
})

class PaymentService
{
    static getDbServiceInstance()
    {
        return instance ? instance :new PaymentService();
    }

async PremiumMembership(id){
try{

  const resolve= new Promise((resolve, reject)=>
  {
    const amount=2500;
rzp.orders.create({amount: amount, currency: "INR"}, (err, order)=>
{
  console.log(order);
  if(err)
    {
      throw new Error(JSON.stringify(err));
    }
    else
    {
      const query= "insert into Premiumuser (ID, orderid, status, ispremium) values(?,?,'pending','false')";
      connection.query(query, [id, order.id], (err, data)=>{
        if(err)
        {
          console.log(err)
        }
        else
        {
          resolve([order.id, rzp.key_id])
        }
      })
      
    }
  });
})
  return resolve;
}
catch(err)
{
  console.log(err);
  //res.status(403).json({messge: 'Something went wrong', error:err})
}


};
 

async MembershipPayment (order_id, payment_id){
  const updatedata= new Promise((resolve, reject)=>{
    try{
      
      console.log(order_id);

  const query= "UPDATE Premiumuser SET paymentid=?, status=?, ispremium=?  WHERE orderid = ?"
  connection.query(query, [payment_id, 'Successful', 'true', order_id], (err, data)=>{
    if(err)
    {
      console.log(err)
    }
    else 
    {
      resolve (data);
    }
  })

    }
    catch(err){
      console.log(err);
    }

  });
  return updatedata;
}
}

module.exports= PaymentService;
