const passport=require('passport')
const jWTstrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const env=require('./environment')
const User=require('../modals/signup');

let opts={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:env.jwt_secretOrKey

}
passport.use(new jWTstrategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id)
    .then(user=>{
        if(user){
            return done(null,user)
        }
        else{
            return done(null,false)
        }
    })
    .catch(err=>{
        if(err)
        {
            console.log("error in findindg user by jwt",err)
        }
    })
    }))

module.exports=passport;