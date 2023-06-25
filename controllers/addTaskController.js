const Task=require('../modals/To-do_list')
const express=require('express')
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
module.exports.task=(req,res)=>{

    console.log(req.body)
    Task.create({
        description:req.body.description,
        date:req.body.dueDate,
        category:req.body.Category
    })
    .then(newTask =>{
        console.log(newTask);
        res.redirect('back');
    })
    .catch(err =>{
        console.log("Error creating new contact:", err);
    
        res.status(500).send("Error creating new contact");
    })
}