module.exports.signUp=function(req,res){
    if(req.isAuthenticated())
    {
      return res.redirect('/users/profile');
    }
      res.render('signUpPage',{
          title:"codeial | signUp",
          
      })
  }
  