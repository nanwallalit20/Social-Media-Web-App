const passport=require('passport');
const googleOAuth2=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../modals/signup');
const env=require('./environment')
//call passport to use googleauth strategy
passport.use(new googleOAuth2({
    clientID:env.google_clientID,
    clientSecret:env.google_clientSecret,
    callbackURL:env.googgle_success_callbackURL
},
//callback function for token and profile that is received from google
//access token for accessing user details from google
//refresh token, in case of expiry of access token, it will regenerate the token 
 function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec()
     .then(user=>{
        console.log(profile);
        //if found ,set it to req.user
        if(user){
            return done(null,user);
        }
        
        else
        {//if not found ,create a new user and set it to req.user
           
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                

                // Convert the buffer to a hexadecimal string
               
                password:crypto.randomBytes(20).toString('hex'),
                avatar:profile._json.picture
            })
            .then(user=>{
                return done(null,user);
            })
            .catch(err=>{
                if(err){
                    console.log('error in passport-Oauth',err);
                }
            })
        }
     })
     .catch(err=>{
        if(err){
            console.log('error in google-O-auth');
        }
     })
 })
)
module.exports=passport;