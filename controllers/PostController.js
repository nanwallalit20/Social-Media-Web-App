const Post=require('../modals/postSchema');
const Comment =require('../modals/comment');
const { default: mongoose } = require('mongoose');


module.exports.create= async function(req,res){
    try{
      if(req.isAuthenticated())
      {
       let newPost= await Post.create({
         post:req.body.content,
          user:res.locals.user._id ,    //we can access the same with req.user._id
       });
         req.flash('success','Post Published!!!')
         return res.redirect('/');
     } 
     else{
      req.flash('error','Please Login/SignUp to Publish!!!!')
       return  res.render('signInPage',{
         title:'codeial | signIn'
     })
        }  
    }
    catch(err)
    {
      if(err)
      {
        req.flash('error',err);
      }
    }  
 }
 module.exports.destroy= async function(req,res){
  
    //  console.log(req.params)
    //   let newid= new mongoose.Types.ObjectId(req.params.id)
    //   console.log(newid)
    try{
      let post= await Post.findById(req.params.id)
        console.log(post);
        if(post.user==req.user.id){
          post.deleteOne(post._id);
         let deletedComment=await Comment.deleteMany({post:req.params.id});
         
         req.flash('success','Post deleted!!')
            return res.redirect('back');
        }
        else{
          req.flash('error','You are not authorised to perform this !!!!')
          return res.redirect('/users/sign-Out');
        }
    }
    catch(err)
    {
      if(err)
      {
        req.flash('error',err);
      }
    }
      
  }
 
 