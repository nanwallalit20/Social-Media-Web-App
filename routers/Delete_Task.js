const express=require("express");
const router=express.Router();

const deleteTaskController=require("../controllers/deleteTaskController")

// console.log('routes called');

router.get('/delete',deleteTaskController.delete);
// router.use('/users',require('./users'))

module.exports=router;