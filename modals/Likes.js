
const mongoose=require('mongoose');

const LikeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        refPath:'onModel'
    },
    onModel:{
        type : String ,
        enum:['Post','Comment'],
        require:true
    },

},{
    timestamps:true
}
)

const Like=mongoose.model('Likes',LikeSchema);
module.exports=Like;