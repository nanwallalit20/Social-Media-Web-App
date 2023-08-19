const User=require('../modals/signup');
const Post=require('../modals/postSchema');
const Comment=require('../modals/comment')
const { Cookie } = require('express-session');
const fs=require('fs');
const path =require('path');
const reset=require('../modals/forget-pass');
const forgotPasswordNodemailer=require('../Mailers/forgot_passwordMailer')
const crypto=require('crypto');


module.exports.profile= async function(req,res){
  try{ 
  let id=req.params.id;
    console.log('welcome to profile');
    let user= await User.findById(id);
   console.log(user);
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
    
    if(req.params.id==req.user.id)
    {

    //  let user= await User.findByIdAndUpdate(id,req.body);
    //   console.log('updated successfully')
    //   return res.redirect('back')
          let user=await User.findById(req.params.id);
          User.uploadAvtar(req,res,function(err){
            if(err){
              console.log("Error uploading file");
            }
            user.name=req.body.name,
            user.email = req.body.email;
            if(req.file){

              if(user.avatar){
                fs.unlinkSync(path.join(__dirname+'/..'+user.avatar))
              }  

              user.avatar=User.avtarPath+'/'+req.file.filename; 
            }
           
            console.log(user)
            user.save();
            return res.redirect('back');
            
          })
      
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
        let newUser=await User.create({
          name:req.body.name,
          email:req.body.email,
          password:req.body.password,
          isVerified:false
        });
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
  req.flash('success','you have logged in ');
    return res.redirect('/');
}

module.exports.destroySession=async function(req,res){
  req.logout(function(err){
    if(err){
       console.log('error facing while signout the page');
    }
    req.flash('success','You have logged out successfully');
    console.log('signed out successfully');
    return res.redirect('/sign-In');
   
  });
  
}

module.exports.details=function(req,res){
  let id=req.params.id;
  User.findById(id).
  then(user=>{
    if(req.xhr){
      return res.status(200).json({
        data:{
          user:user
        },
        message:"user fetched !!"
      })
    }
  })
}
module.exports.delete=async function(req,res){
  
  try{
    let user=await User.findByIdAndDelete(req.params.id);
     
    
   await Post.deleteMany({user:user._id});
   
    await Comment.deleteMany({user:user._id})
    
   console.log('user deleted successfully');
    return res.redirect('back');
  }
catch(err){
  console.log(`Error in deleting user ${err}`)
}
}
module.exports.forgot=function(req,res){

  res.render('forgotPass',{
    title:"forgot-password"
  })
}
module.exports.reset=async function(req,res){
try{
  console.log('email from request is',req.body);
  let token= crypto.randomBytes(20).toString('hex');
  let finduser= await User.findOne({email:req.body.email});
  console.log('finduser is',finduser)
  
 
  let forgot_user= await reset.create({
   
    token:token,
    user:finduser._id,
    isValid:true,
  })

  forgotPasswordNodemailer.newPassword(token)
  req.flash('success','reset password mail is send successfully!!!')
  return res.redirect('/sign-In')
}catch(err){
  if(err){
    console.log('error in sending forgot password mail',err)
  }
}
  
}
module.exports.confirmPass=(req,res)=>{
  let token=req.query.accesstoken;
  reset.findOne({token:token}).then(user=>{
    if(user.isValid==true){
      user.isValid=false;
      res.render('newPassword',{
        token:token,
        title:'Reset Password'
      });
    }
    else{
      reset.deleteOne({token:token});
      res.send('your token is expired!!!');
    }
  })
 
}
module.exports.newPassword=async (req,res)=>{
  console.log('received data:',req.query);
  console.log('body data:',req.body);

  try {
        if(req.body.newPassword != req.body.confirmPassword){
          req.flash('error','password didnot match please re-enter it')
          return res.redirect('back')
        }
        else{
          let token =req.query.accesstoken;
         let forgotUser=await reset.findOne({token:token});
         
          let updatedUser= await User.findByIdAndUpdate(forgotUser.user,{
            password:req.body.newPassword
          })
          updatedUser.save();
          console.log('updated details are:',updatedUser);
          await reset.deleteOne({token:token})
          req.flash('success','Your password is changed Successfully!!')
          return res.redirect('/sign-In') 
        }
  }
  catch (e) {
    if(e){
      console.log('error in setting new password for the user',e);
    }
  }
}