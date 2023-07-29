const mongosh=require('mongoose');
const User = require('./signup');
const Comment=require('./comment');

const postSchema=new mongosh.Schema({
    post:{
        type:String,
        require:true
    },
    user:{
        type:mongosh.Schema.Types.ObjectId,
        ref:User
    },
    comment:
        [
            {
                type:mongosh.Schema.ObjectId,
                ref:Comment
            }
        ]
},{
    timestamps:true
})
const Post=mongosh.model('Post',postSchema);
module.exports= Post;