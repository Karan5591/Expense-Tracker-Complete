const express= require('express');
const getdata=require('../controllers/signup')

const router=express.Router();

router.route('/').get(getdata[0]);
router.route('/').post(getdata[1]);

module.exports=router;