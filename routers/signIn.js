const express=require('express');


const router=express.Router();

const homeController=require('../controllers/signInController')

router.get('/',homeController.signIn);

module.exports=router;