const express=require('express');
const mongoose=require('mongoose')
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const Task=require('../modals/To-do_list')


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