const express=require('express');

const router=express.Router();
const passport=require('passport');
const userController=require('../controllers/usersController');

 router.get('/profile',passport.checkAuthentication,userController.profile)

 router.post('/post',passport.checkAuthentication,userController.post);
 router.post('/comment',userController.comment);


router.post('/create',userController.create);
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-In'}
),userController.session);

router.get('/sign-Out',userController.destroySession);


module.exports=router;