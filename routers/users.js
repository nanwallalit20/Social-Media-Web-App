const express=require('express');

const router=express.Router();
const userController=require('../controllers/usersController');


router.get('/sign-Up',userController.signUp);
router.get('/sign-In',userController.signIn);
router.post('/create',userController.create);
router.post('/create-session',userController.session);


module.exports=router;