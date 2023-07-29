const express=require('express');


const router=express.Router();

const homeController=require('../controllers/signUpController')

router.get('/',homeController.signUp);

module.exports=router;