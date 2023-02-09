const express= require('express');
const getdata=require('../controllers/register')
const expenseData= require('../controllers/ExpenseData')
const bodyParser= require('body-parser')


const router=express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}))

router.route('/').get(getdata.loginData);
router.route('/signup').get(getdata.signUp);
router.route('/Expenses').get(expenseData.getAllData) 

router.route('/loginUser').post(getdata.check);
router.route('/RegisterUser').post(getdata.registerUser);
router.route('/AddExpense').post(expenseData.expenseData);

module.exports=router;