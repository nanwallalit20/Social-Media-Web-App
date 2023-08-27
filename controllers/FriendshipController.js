const User=require('../modals/signup');
const Friendship=require('../modals/friendship');
const mongoose=require('mongoose')
module.exports.friend=async function(req,res){
    let friends=false;
   
    
    try{
        let currentUser=await User.findById(req.user.id).populate('friends');
        let friendUser=await User.findById(req.query.id).populate('friends');
        // let friends=currentUser.friends;
        // console.log('friends:',friends);
       // console.log('current user is',currentUser)
        let existingFriend=await Friendship.findOne({
            $or:[
                {from_user:req.user._id, to_user:req.query.id},
                {to_user:req.user._id , from_user : req.query.id}
            ]
        }); 
        //console.log('existing user',existingFriend)
        if(existingFriend){
           currentUser.friends.pull(existingFriend._id);
           friendUser.friends.pull(existingFriend._id);
          
           currentUser.save();
           friendUser.save();
           existingFriend.deleteOne();
           friends=false

           req.flash('success','Unfriend');
        }
        //if user is found then remove it from friendlist
        else{
            let newFriend=await Friendship.create({
                from_user:req.user._id,
                to_user:req.query.id,
              
           
            });
           currentUser.friends.push(newFriend._id);
           friendUser.friends.push(newFriend._id);
           friendUser.save();
            currentUser.save();
            req.flash('success','friend request sent!!') 
            friends=true; 
        }
        return res.json(200,{
            message:'successfully request accepted',
            data:{
                friends:friends
            }
        })
    }
    catch(e){
        console.log('error in sending the friend Request to user',e);
        return res.redirect('back');
    }
    
}



module.exports.search=async function(req,res){
    try {
        const searchQuery = req.query.q; // Get search query from request
        const searchResults = await User.find({ name: { $regex: searchQuery, $options: 'i' } }); // Modify query based on your model
        return res.status(200).json(searchResults);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}