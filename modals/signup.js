const mongoose=require('mongoose');
const path=require('path')
const multer=require('multer');
const Friendship = require('./friendship');
const Avtar_path=path.join('/uploads/users/avatars')

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
    },
    avatar:{
        type:String
    },
    isVerified:{
        type:Boolean,
        
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Friendship
        }
    ]
}, {
    timestamps:true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',Avtar_path))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });

  //static methods
  signUpSchema.statics.uploadAvtar=multer({storage:storage}).single('avatar');
  signUpSchema.statics.avtarPath=Avtar_path;


const User=mongoose.model('User',signUpSchema);
module.exports=User;