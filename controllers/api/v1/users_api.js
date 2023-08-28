const User=require('../../../modals/signup')
const jwt=require('jsonwebtoken');
const env=require('../../../config/environment')

module.exports.createSession = async function(req,res)
{
    try{
     let user=await User.findOne({email:req.body.email});
       if(!user || user.password != req.body.password )
        {   return res.json(402,{
            message:"Invalid Credentials"
            })
        }
        return res.json(200,{
        message:'sign in successful please keep your token safe!!!',
        data:{
            token:jwt.sign(user.toJSON(),env.jwt_secretOrKey, {expiresIn:'1000000'})
        }
        })
    }
    catch(err){
        console.log('**********error:',err);
        return res.json(500,{
            message:'internal server error'
        })
    }
}