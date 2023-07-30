const express=require('express');
const passport=require('passport');


const router=express.Router();

const PostController=require('../controllers/PostController')

router.post('/create',passport.checkAuthentication,PostController.create);
router.get('/destroy/:id',passport.checkAuthentication,PostController.destroy);

module.exports=router;