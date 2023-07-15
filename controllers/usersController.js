const User=require('../modals/signup');


module.exports.post=function(req,res){
    return res.end('<h1> this is user xyz post</h1>')
}
module.exports.signUp=function(req,res){
    res.render('signUpPage',{
        title:"codeial | signUp"
    })
}
module.exports.signIn=function(req,res){
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
    //todo later
}