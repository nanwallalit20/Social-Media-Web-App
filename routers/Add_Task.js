const express=require("express");
const router=express.Router();

const addTaskController=require("../controllers/addTaskController")

// console.log('routes called');

router.post('/create',addTaskController.task)
// router.use('/users',require('./users'))

module.exports=router;