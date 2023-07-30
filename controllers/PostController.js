const Post=require('../modals/postSchema');
const Comment =require('../modals/comment');
const { default: mongoose } = require('mongoose');


module.exports.create=function(req,res){
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
 module.exports.destroy=function(req,res){
  
    //  console.log(req.params)
    //   let newid= new mongoose.Types.ObjectId(req.params.id)
    //   console.log(newid)
      Post.findById(req.params.id)

      .then(post=>{
        console.log(post);
        if(post.user==req.user.id){
          post.deleteOne(post._id);
          Comment.deleteMany({post:req.params.id}).
          then(()=>{
            console.log('comments deleted successfully');
            return res.redirect('back');
          })
          .catch(err=>{
            if(err)
            {
              console.log('error in deleting comments',err)
              return res.redirect('back');
            }
          })
        }
        else{
          console.log('you are trying to delete some other users post ');
          return res.redirect('/users/sign-Out');
        }
      })
      .catch(err=>{
        if(err)
        {
          console.log('error in finding post in the db',err);
          return res.redirect('back');
        }
      })
 }
 