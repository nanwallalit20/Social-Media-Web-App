const Post=require('../modals/postSchema');
const Comment=require('../modals/comment');


module.exports.create = async function(req,res)
{
  try{
        console.log(req.body);
        let post= await Post.findById(req.body.post);
        let newComment= await Comment.create({
          content:req.body.comment,
          user:req.user._id,
        post:req.body.post,
      });
       console.log("new comment:",newComment)
        
        post.comment.push(newComment);
        post.save();
        console.log(post);
        return res.redirect('back');
      }
      catch(err)
      {
        if(err)
        {
          consolole.log('error',err);
        }
      }
  
    }
   
  module.exports.destroy=async function(req,res)
  {
    try{
      let comment=await Comment.findById(req.params.id);
      let post= await Post.findById(comment.post)
       
         if( comment.user == req.user.id || post.user==req.user.id )
         {
               let postId=comment.post;
               comment.deleteOne(comment._id);
               let updatedPost= await Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}});
               updatedPost.save();
               console.log("deleted");
               return res.redirect('back')
          }
          else{
           console.log('you are trying to delete someone others comment');
           return res.redirect('back');
             }
   
    }
    catch(err)
    {
      if(err)
      {
        console.log('error destroying comment',err);
      }
    }
  
    }
    