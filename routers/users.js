const express=require('express');

const router=express.Router();
const passport=require('passport');
const userController=require('../controllers/usersController');

 router.get('/profile/:id',passport.checkAuthentication,userController.profile)

 router.post('/update/:id',passport.checkAuthentication,userController.update )
 router.get('/userDetail/:id',passport.checkAuthentication,userController.details);

 


router.post('/create',userController.create);
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/sign-In'}
),userController.session);

router.get('/sign-Out',userController.destroySession);


module.exports=router;