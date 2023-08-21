const mongosh=require('mongoose');
const Likes=require('./Likes');
const commentSchema=new mongosh.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongosh.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongosh.Schema.Types.ObjectId,
        ref:'Post'
    },
    likes:
    [
        {
            type : mongosh.Schema.Types.ObjectId ,
            ref:Likes
        }
    ]  
},{
    timestamps:true
})
const Comment=mongosh.model('comment',commentSchema);
module.exports =Comment;