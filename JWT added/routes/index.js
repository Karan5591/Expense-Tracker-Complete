const express= require('express');
const getdata=require('../controllers/register')
const expenseData= require('../controllers/ExpenseData')
const middleData= require('../middleware/registertoken')
const bodyParser= require('body-parser')
const auth= require("../middleware/registertoken")


const router=express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}))

router.route('/').get(getdata.loginData);
router.route('/signup').get(getdata.signUp);
router.get('/Expenses', auth.auth ,expenseData.getAllData) 

router.route('/loginUser').post(getdata.check);
router.route('/RegisterUser').post(getdata.registerUser);
router.route('/AddExpense').post(expenseData.expenseData);
router.route('/deleteData').get(expenseData.deleteData);


module.exports=router;