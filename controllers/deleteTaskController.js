const express=require('express')
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());


module.exports.delete=function(req,res){
    console.log('aaya data',req.query);
    res.redirect('back');
}