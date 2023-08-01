module.exports.signIn=async function(req,res){
    if(req.isAuthenticated()){
      
      return res.redirect('/users/profile');
    }
      res.render('signInPage',{
          title:'codeial | signIn'
      })
  }