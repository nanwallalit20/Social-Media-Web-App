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
         console.log("new post:",newPost);
         return res.redirect('/');
     } 
     else{
       return  res.render('signInPage',{
         title:'codeial | signIn'
     })
        }  
    }
    catch(err)
    {
      if(err)
      {
        console.log('error in creating post',err);
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
         
            console.log('comments deleted successfully');
            return res.redirect('back');
        }
        else{
          console.log('you are trying to delete some other users post ');
          return res.redirect('/users/sign-Out');
        }
    }
    catch(err)
    {
      if(err)
      {
        console.log('error in deleting post',err);
      }
    }
      
  }
 
 