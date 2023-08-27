const mongoose=require('mongoose');
const User=require('./signup');
const FriendSchema=new mongoose.Schema({

    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'    
    }
 
},
{
    timestamps:true
})

const Friendship=mongoose.model('Friendship',FriendSchema);
module.exports=Friendship;