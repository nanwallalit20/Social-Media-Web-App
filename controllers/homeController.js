const Post=require('../modals/postSchema')
const Comment=require('../modals/comment');
const User=require('../modals/signup');
module.exports.home=function(req,res){

    // Post.find({user:req.user._id}).
    // then(posts=>{
    //     console.log("Posts", posts);
        
    //         res.render('homePage',{
    //             title:'Home',
    //             Posts:posts
    //         })
    // })
    // .catch(err=>{
    //     if(err)
    //     {
    //         console.log("error in fetching post");
    //     }
    // })

    //method 2 for displaying user data on the page as shown in video
    Post.find({}).populate('user').populate({path:'comment',populate:{path:'user'}}).exec().
    then(posts=>{
        User.find().
        then(users=>{
            return res.render('homepage',{
                title:'home',
                Posts:posts,
                Users: users
        })
        
        })
        .catch(err=>{
            if(err){
                console.log('error in finding user')
                return res.redirect('back')
            }
        })
    })
    
    .catch(err=>{
       if(err){
        console.log('error in displaying post',err);
        return res.redirect('back')
       } 
    })

}