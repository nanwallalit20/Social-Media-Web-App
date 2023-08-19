const Post=require('../../../modals/postSchema');
const Comment=require('../../../modals/comment');



module.exports.data=async function(req,res){
    try{    
            let posts= await Post.find({});
            return res.json(200,{
                message:"post fetched ",
                posts:posts
            })
    }
    catch(err)
        {
            if(err)
            {
                console.log('**********error:',err);
                return res.json(500,{
                    message:'internal server error'
                })
            }    
        }
}

module.exports.create=async function(req,res){
    try{
            if(req.isAuthenticated())
            {
            let newPost= await Post.create({
            post:req.body.content,
                user:res.locals.user._id ,    //we can access the same with req.user._id
            });
            
            return res.json(200,{
                message:'post fetched successfully!!',
                data:{
                    post:newPost
                }
            })
             } 
            else
            {
            return res.json(403,{
                message:'unauthorised access'
            })
            }  
      }
      catch(err)
      {
        console.log('**********error:',err);
        return res.json(500,{
            message:'internal server error'
        })
      }  
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