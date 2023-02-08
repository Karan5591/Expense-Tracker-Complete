const express= require('express');
const getdata=require('../controllers/register')
const bodyParser= require('body-parser')


const router=express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}))

router.route('/').get(getdata.loginData);
router.route('/loginUser').post(getdata.check);

module.exports=router;