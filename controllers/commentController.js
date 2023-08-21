const Post=require('../modals/postSchema');
const Comment=require('../modals/comment');
const  User=require('../modals/signup')
const commentsMailer=require('../Mailers/newComment_mailer')
const queue=require('../config/kue')
const commentsWorker=require('../workers/comment_email_worker')
const Like=require('../modals/Likes');


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
        console.log('new comment is :',newComment);
        newComment.populate('user','name email')
            .then
              (comment=>{
               // commentsMailer.newComment(comment);
               

               let job=queue.create('emails',comment).save(function(err){
                if(err ) {
                  console.log('error in creating queue',err);
                  return;
                }
                console.log('job id is:',job.id);
               })
                
                if(req.xhr){
                  return res.status(200).json({
                    data:{
                      comment:comment
                    },
                    message:'New Comment Added!!!!'
                  })
                }
                req.flash('success','New Comment Added');
                return res.redirect('back');
              })
            .catch(err=>{
                if(err){
                  console.log('error in populating user',err) 
                }
            })
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
               await Like.deleteMany({likeable:comment._id,onModel:'Comment'});
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
    