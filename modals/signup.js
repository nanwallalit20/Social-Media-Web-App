const mongoose=require('mongoose');

const signUpSchema=new mongoose.Schema({
    email:
    {
        type:String,
        Required:true,
        unique:true
    },
    password:
    {
        type:String,
        required:true,
    },
    name:
    {
        type:String,
        required:true,
    }
}, {
    timestamps:true
});
const Page=mongoose.model('user',signUpSchema);
module.exports=Page;