const mongosh=require('mongoose');
const User = require('./signup');

const verification=new mongosh.Schema({
    
    user:{
        type:mongosh.Schema.Types.ObjectId,
        ref:User
    },
  
    token:{
        type : String ,
        required:true
    },
    isValid:{
        type:Boolean,
    }
},{
    timestamps:true
})

const reset=mongosh.model('reset',verification);

module.exports= reset;