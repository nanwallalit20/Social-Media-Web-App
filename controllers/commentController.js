const Post=require('../modals/postSchema');
const Comment=require('../modals/comment');


module.exports.create = async function(req,res)
{
  try{
        console.log( 'req bidy:',req.body);
        let post= await Post.findById(req.body.post);
        let newComment= await Comment.create({
          content:req.body.comment,
          user:req.user._id,
        post:req.body.post,
      });
     
        
        post.comment.push(newComment);
        post.save();
        console.log(post);
        if(req.xhr){
          return res.status(200).json({
            data:{
              comment:newComment
            },
            message:'New Comment Added!!!!'
          })
          
        }
        req.flash('success','New Comment Added');
        return res.redirect('back');
      }
      catch(err)
      {
        if(err)
        {
          req.flash('error',err);
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
               if(req.xhr){
                return res.status(200).json({
                  data:{
                    comment_id:comment._id
                  },
                  message:'Comment Deleted!!!!'
                })
               }
               req.flash('success','comment deleted')
               return res.redirect('back')
          }
          else{
            req.flash('error','you are trying to delete someone others comment')
           return res.redirect('back');
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
    