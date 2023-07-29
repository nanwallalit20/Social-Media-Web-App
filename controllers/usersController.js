const User=require('../modals/signup');
const Post=require('../modals/postSchema');
const Comment=require('../modals/comment')
const { Cookie } = require('express-session');

module.exports.profile=function(req,res){
    console.log('welcome to profile');
    res.render('userProfile',{
      title:'User Profile',
      
    })
    
}
module.exports.post=function(req,res){
   if(req.isAuthenticated()){
    console.log(req.user._id);
    console.log(res.locals.user._id)
    Post.create({
        post:req.body.content,
         user:res.locals.user._id ,    //we can access the same with req.user._id
      
    })
      .then (newPost=>{
         console.log(newPost);
        return res.redirect('/');
    })
    .catch(err=>{
        if(err)
          { 
          console.log('error in creating new this.post',err);
          return res.send('error in creating post');
          }
      })
    } 
    else{
      return  res.render('signInPage',{
        title:'codeial | signIn'
    })
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
      return res.redirect('/users/sign-In');
    })
    .catch(err => {
      console.log('Error in creating user while signing up:', err);
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
    return res.redirect('/users/sign-In');
   
  });
  
}

module.exports.comment=function(req,res){
  console.log(req.body);
 
  Post.findById(req.body.post).
  then(post=>{
    Comment.create({
       content:req.body.comment,
       user:req.user._id,
      post:req.body.post,
    }).
    then(newComment=>{
      console.log(newComment)
      
      post.comment.push(newComment);
      post.save();
      console.log(post);
      return res.redirect('back');

    })
    .catch(err=>{
      if(err)
      {
        console.log('error in creating comment',err)
      }
    })   
  })
  .catch(err=>{
    if(err)
    {
      console.log('error in findind post',err)
    }
  })

  
}