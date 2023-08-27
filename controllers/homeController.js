const Post=require('../modals/postSchema')
const Comment=require('../modals/comment');
const User=require('../modals/signup');
module.exports.home=async function(req,res){

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
    try{
      let posts = await Post.find({}).sort('-createdAt')
          .populate('user')
          .populate({
              path: 'comment',
              populate: [
                  { path: 'user' },
                  { path: 'likes' }
              ]
          })
          .populate('likes');

        console.log('posts form home controller contains the following details',posts[0].comment[0].user)
        let users= await User.find({});
        if(req.user){
          let currentUser = await User.findById(req.user._id)
          .populate({
            path: 'friends',
            populate: { path: 'to_user' }
          });
          let frineds = currentUser.friends.map(friend => friend.to_user);          
          return res.render('homepage',{
              title:'home',
              Posts:posts,
              Users: users,
              Friends :frineds  
          })
            }
        else{
              return res.render('homepage',{
                title:'home',
                Posts:posts,
                Users: users,   
              })
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