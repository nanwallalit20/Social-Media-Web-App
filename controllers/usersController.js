const User=require('../modals/signup');
const Post=require('../modals/postSchema');
const Comment=require('../modals/comment')
const { Cookie } = require('express-session');

module.exports.profile= async function(req,res){
  try{ 
  let id=req.params.id;
    console.log('welcome to profile');
    let user= await User.findById(id);
   
          res.render('userProfile',{
        title:'User Profile',
        userData : user      
      })
    } 
    catch(err)
    {
      if(err)
      {
        console.log('error in rendering profile',err);
      }
    } 
  
}

module.exports.update= async function(req,res){
  try{
    let id=req.params.id;
    if(id==req.user.id)
    {
     let user= await User.findByIdAndUpdate(id,req.body);
      console.log('updated successfully')
      return res.redirect('back')
    }
    else{
      return res.status(403,'unauthorised access');
    }  
  }
  catch(err)
  {
    if(err)
    {
      console.log('error in updating profile',err);
    }
  }  
}
      
 

module.exports.create= async function(req,res){
  try{
    if(req.body.password != req.body.confirm_password)
    {
        res.redirect('back');
    }
   let existingUser=await User.findOne({ email: req.body.email })
      if (!existingUser) {
        let newUser=await User.create(req.body);
        console.log('User created successfully',newUser);
        return res.redirect('/sign-In');
      } 
      else {
        return Promise.reject('User already exists');
      }
    }
     catch(err)
      {
        if(err)
        {
          console.log('error in updating profile',err);
        }
      }  
}
module.exports.session=async function(req,res){
    return res.redirect('/');
}

module.exports.destroySession=async function(req,res){
  req.logout(function(err){
    if(err){
       console.log('error facing while signout the page');
    }
    console.log('signed out successfully');
    return res.redirect('/sign-In');
   
  });
  
}

