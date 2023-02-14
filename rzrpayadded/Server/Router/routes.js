const express= require('express');
const cors=require('cors')
const dbService = require('../Services/dbservice');
const userService = require('../Services/userServices');
const auth= require('../middleware/registertoken')
const Pmemebership=('../Controller/PaymentHandle')
const PaymentService=require('../Controller/PaymentHandle')
const { response } = require('express');
const router= express.Router();
const app=express();
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({extended: false}));

router.get("/", (req, res)=>{
    
    res.sendFile("/Practice/Client/Index.html")
})

 //Register new User
 router.get('/signup', (req, res)=>{
    res.sendFile('/Practice/public/register.html');
 }); 

 router.post('/RegisterUser', (req, res)=>{
    const {name, email, password}=req.body;
    const db= dbService.getDbServiceInstance();
    const result= db.registerUser(name, email, password);
    result
    .then(data=>res.send(`<html><body><h2>${data}</h2> <br><br> <a href='/'>Go back to home</a></body></html>`))       
    .catch(err=> console.log(err));

})

//Login User

router.post("/loginUser",   userService.check);

//create
router.post('/insert', auth.auth, (req, res)=>{
    const id=req.id;
    const {amount, description, category}=req.body;
    const db= dbService.getDbServiceInstance();
    const result= db.insertNewData(id, amount, description, category);
    result
    .then(data=>res.json({success:data}))       
    .catch(err=> console.log(err));

})
//read

router.get('/getAll',auth.auth, (req, res)=>{
    const db= dbService.getDbServiceInstance();
    const id=req.id;
   const result= db.getAllData(id);
   result
   .then(data=>res.json({data:data}))
    .catch(err=>console.log(err));  
});

//update

router.patch('/update', (request, response) => {
    const { id, amount, description, category } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, amount, description, category);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

//delete
router.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

router.get('/Pmembership',auth.auth, (request, response) => {
    
    const id=request.id;
    
    const db = PaymentService.getDbServiceInstance();

    const result = db.PremiumMembership(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

router.post('/updatetxnstatus',auth.auth, (request, response) => {
    
    console.log(request);
    const db = PaymentService.getDbServiceInstance();

    const result = db.MembershipPayment(request.order_id, request.payment_id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

module.exports=router;



