const User=require('../modals/signup');
const Post=require('../modals/postSchema');
const Comment=require('../modals/comment')
const { Cookie } = require('express-session');

module.exports.profile=function(req,res){
  let id=req.params.id;
    console.log('welcome to profile');
    User.findById(id)
    .then(user=>{
          res.render('userProfile',{
        title:'User Profile',
        userData : user      
      })
    })  
}

module.exports.update=function(req,res){
  let id=req.params.id;
  if(id==req.user.id)
  {
    User.findByIdAndUpdate(id,req.body)
      .then(user=>{
        console.log('updated successfully')
    return res.redirect('back')
  })
  .catch(err=>{
    if(err)
    {
      console.log('error in updating user');
      return res.redirect('back');
    }
  })
  }
  else{
    return res.status(403,'unauthorised access');
  }
  
}
      
 

module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password)
    {
        res.redirect('back');
    }
   User.findOne({ email: req.body.email })
    .then(existingUser => {
      
      if (!existingUser) {
        return User.create(req.body);
      } else {
        return Promise.reject('User already exists');
      }
    })
    .then(newUser => {
      console.log('User created successfully');
      return res.redirect('/sign-In');
    })
    .catch(err => {
      if(err){
        console.log('Error in creating user while signing up:', err);
      }
      
      return res.redirect('back');
    });
}
module.exports.session=function(req,res){
    return res.redirect('/');
}
module.exports.destroySession=function(req,res){
  req.logout(function(err){
    if(err){
       console.log('error facing while signout the page');
    }
    console.log('signed out successfully');
    return res.redirect('/sign-In');
   
  });
  
}

