const mongosh=require('mongoose');
const path=require('path');
const User = require('./signup');
const Comment=require('./comment');
const Likes=require('./Likes');


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
        ],
    likes:
    [
        {
            type : mongosh.Schema.ObjectId ,
            ref:Likes
        }
    ],

},{
    timestamps:true
})

const Post=mongosh.model('Post',postSchema);
module.exports= Post;