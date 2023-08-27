const express=require('express');

const router=express.Router();
const passport=require('passport');
const userController=require('../controllers/usersController');
const { Strategy } = require('passport-jwt');

 router.get('/profile/:id',passport.checkAuthentication,userController.profile)


 router.post('/update/:id',passport.checkAuthentication,userController.update )
 router.get('/userDetail/:id',passport.checkAuthentication,userController.details);

 router.get('/delete/:id',passport.checkAuthentication,userController.delete)

 


router.post('/create',userController.create);
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/sign-In'}
),userController.session);

router.get('/sign-Out',userController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/auth/google/callback', passport.authenticate('google',{failureRedirect:'/sign-In'}),userController.session);
router.get('/forgot-pass',userController.forgot)
router.post('/reset-password',userController.reset)
router.get('/resetPassword',userController.confirmPass);
router.post('/newPassword',userController.newPassword);
router.get('/verify_user',userController.verifyModule);


module.exports=router;