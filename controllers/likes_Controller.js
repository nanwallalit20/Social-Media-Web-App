const User=require('../modals/signup');
const Post=require('../modals/postSchema');
const Comment=require('../modals/comment');
const Like=require('../modals/Likes')


module.exports.toggle=async function(req,res){
    try{
        //likes/toggle/?id='abdjrkef'&type=Post
        let likeable;
        let deleted=false;
        console.log(req.query);

        if(req.query.type=='Post')
        {
          likeable=await Post.findById(req.query.id).populate('likes');
        }
        else{
            likeable=await Comment.findById(req.query.id).populate('likes');
        }

        //check if like already exist
        let existingLike=await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })
        //if already exist delete it
        if(existingLike)
        {   
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.deleteOne();
            deleted=true;
            req.flash('success','disliked ')
        }
        //else create new one
        else{
            let newLike=await Like.create({
                likeable:req.query.id,
                onModel:req.query.type,
                user:req.user._id
            })
            likeable.likes.push(newLike._id);
            likeable.save();
            req.flash('success','Liked ')
        }
        return res.json(200, {
            message: "Request successful!",
            data: {
                deleted: deleted
            }
        })
    }
    catch(e){
        console.log('error in toggling the like',e)
        return res.json(500,{
            message:'Internal Server Error'
        })
    }
}