const Post=require('../modals/postSchema');
const Comment=require('../modals/comment');


module.exports.create=function(req,res){
    console.log(req.body);
   
    Post.findById(req.body.post).
    then(post=>{
      Comment.create({
         content:req.body.comment,
         user:req.user._id,
        post:req.body.post,
      }).
      then(newComment=>{
        console.log(newComment)
        
        post.comment.push(newComment);
        post.save();
        console.log(post);
        return res.redirect('back');
  
      })
      .catch(err=>{
        if(err)
        {
          console.log('error in creating comment',err)
        }
      })   
    })
    .catch(err=>{
      if(err)
      {
        console.log('error in findind post',err)
      }
    })
  
    
  }
  module.exports.destroy=function(req,res)
  {
    Comment.findById(req.params.id)
    .then(comment=>{
      
    Post.findById(comment.post)
    .then(post=>{
      if( comment.user == req.user.id || post.user==req.user.id ){
        let postId=comment.post;
        comment.deleteOne(comment._id);

        Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}})
        .then(post=>{
          
          post.save();
          console.log("deleted");
          
          return res.redirect('back')
        })
        .catch(err=>{
          if(err)
          {
            console.log('error in finding post',err)
            return res.redirect('back');
          }
        })
        
        
       }
       else{
        console.log('you are trying to delete someone others comment');
        return res.redirect('back');
     }

    })
    .catch(err=>{
      if(err){
        console.log('Error while deleting the comments ',err );
        return res.redirect('back');
      }
    })
       
      
    })
    .catch(err=>{
      if ( err ){
        console.log('error in finding comment',err);
        return res.redirect('back');
      }
    })
  }