module.exports.signUp=async function(req,res){
    if(req.isAuthenticated())
    {
      return res.redirect(`/users/profile/${req.user._id}`);
    }
      res.render('signUpPage',{
          title:"codeial | signUp",
          
      })
  }
  