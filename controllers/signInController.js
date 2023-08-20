module.exports.signIn=async function(req,res){
  if(req.isAuthenticated()){
    console.log(req.user)
    
    return res.redirect(`/users/profile/${req.user._id}`);
  }
    res.render('signInPage',{
        title:'codeial | signIn'
    })
}