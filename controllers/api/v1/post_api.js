const Post=require('../../../modals/postSchema');
const Comment=require('../../../modals/comment');

module.exports.index=function(req,res){
    return res.json(200,{
        message:'api posts',
        posts:[]
    })
}

module.exports.destroy= async function(req,res){
    try{
      let post= await Post.findById(req.params.id)
        if(post.user==req.user.id){
          post.deleteOne(post._id);
         let deletedComment=await Comment.deleteMany({post:req.params.id});
         return res.json(200,{
            message:'post and associated comments is deleted successfully'
         })
        }
        else{
         return res.json(403,{
            message:'unauthorised access'
         })
        }
    }
    catch(err){
        console.log('**********error:',err);
        return res.json(500,{
            message:'internal server error'
        })
    }
      
  }