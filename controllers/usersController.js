const User=require('../modals/signup');


module.exports.profile=function(req,res){
    console.log('welcome to profile');
    res.render('userProfile',{
      title:'User Profile'
    })
    
}
module.exports.signUp=function(req,res){
  if(req.isAuthenticated())
  {
    return res.redirect('/users/profile');
  }
    res.render('signUpPage',{
        title:"codeial | signUp"
    })
}
module.exports.signIn=function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
    res.render('signInPage',{
        title:'codeial | signIn'
    })
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