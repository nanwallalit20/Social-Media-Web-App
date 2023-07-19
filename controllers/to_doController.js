const Task=require('../modals/To-do_list')
const express=require('express')
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const mongoose=require('mongoose')


module.exports.to_do= function(req,res){
     
    Task.find({})
    .then(Tasks => {
        return res.render('to_doPage',{
            title:"To-Do List App",
            Task_list:Tasks
        })

    })
    .catch(err => {
        console.log("error in fetching contact", err);
        res.status(500).send("Internal Server Error");
      });

}

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
module.exports.delete=function(req,res){
    // console.log('aaya data',req.query.ids);
    let ids = req.query.ids;
    if (!ids) {
        // No rows selected
        console.log("No rows selected");
        return res.status(400).redirect('back');
        
      }
      
    let idArray = ids.split(','); // Split the string into an array of individual IDs
    let newIds = idArray.map(id => new mongoose.Types.ObjectId(id)); // Use new keyword here
    
    Task.deleteMany({ _id: { $in: newIds } })
      .then(deleteTask => {
        if (!deleteTask) {
          console.log("Task does not exist");
          return res.status(404).send("Task not found");
        }
    
        console.log("Task deleted successfully");
        res.redirect('back');
      })
      .catch(err => {
        console.log("Error in deleting Task", err);
        res.status(500).send("Error deleting Task");
      });
    
    
}