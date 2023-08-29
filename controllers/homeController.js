const Post=require('../modals/postSchema')

const User=require('../modals/signup');
module.exports.home=async function(req,res){
  

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
        // console.log('posts form home controller contains the following details',posts[0])
        let users= await User.find({});
        if(req.user){
          let currentUser = await User.findById(req.user._id)
          .populate({
            path: 'friends',
            populate: { path: 'to_user' }
          });
          let frineds = currentUser.friends.map(friend => friend.to_user);          
          return res.render('homePage',{
              title:'home',
              Posts:posts,
              Users: users,
              Friends :frineds  
          })
            }
        else{
              return res.render('homePage',{
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