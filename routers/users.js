const express=require('express');

const router=express.Router();
const userController=require('../controllers/userController')
const userPost=require('../controllers/usersPostController')

router.get('/profile',userController.profile)
router.get('/post',userPost.post);

module.exports=router;