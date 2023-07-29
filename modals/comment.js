const mongosh=require('mongoose');

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
    }
},{
    timestamps:true
})
const Comment=mongosh.model('comment',commentSchema);
module.exports =Comment;