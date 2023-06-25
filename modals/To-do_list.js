const mongoose=require('mongoose')

const workSchema=mongoose.Schema({
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true
    }
});
const Work =mongoose.model('Work',workSchema);
module.exports=Work;