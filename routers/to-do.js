const express=require('express');

const router=express.Router();
const passport=require('passport');

const to_doController=require('../controllers/to_doController');

router.get('/', passport.checkAuthentication,to_doController.to_do)

router.post('/create',to_doController.task);

router.get('/delete',to_doController.delete);



module.exports=router;