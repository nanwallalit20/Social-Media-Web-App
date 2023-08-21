const passport=require('passport');

const LocalStrategy=require('passport-local');

const User=require('../modals/signup');
const reset=require('../modals/forget-pass')
const crypto=require('crypto');
const userVerification=require('../Mailers/user_verification')

//anthentication using passport

passport.use(new LocalStrategy({
    usernameField:'email',
   passReqToCallback:true
},
function( req,email,password,done){
    //find the user establish the identity

    User.findOne({email:email}).
        then(User=>{
            if(!User || User.password != password){
                req.flash('error','invalid login credentials')
                return done(null,false);
            }
            else if(User.isVerified!=true){
                let token= crypto.randomBytes(20).toString('hex');
                 reset.create({
                    token:token,
                    user:User._id,
                    isValid:true,
                    }).then(verifyUser=>{
                        userVerification.verification(token);
                    })
                    .catch(e=>{
                        if(e){
                            console.log('error in creating token for verification mail',e);
                        }
                    })
                 
                console.log("user not verified");
                req.flash('error','email not verified,check your mail');
                return done(null,false);

            }
            else{
                req.flash('success','Logged in ')
                return done(null,User);
            }
          
        })
        .catch(err=>{
            req.flash('error',err);
            return done(err);
        })
        
}
))

//serializing the user to decide which key is to kept in the cookies

passport.serializeUser(function(user,done){
    done(null,user._id);
});

//deserializing the user from the key in the cookies

passport.deserializeUser(function(_id,done){
    User.findById(_id). 
    then(user=>{
        return done(null,user);
    })
    .catch(err=>{
        console.log('error in finding user from db');
        return done(null,false);
    })

})

//check if user is authenticated
passport.checkAuthentication=function(req,res,next){
    //if the user is signed in then pass it to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/sign-In');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending to the locals for view

        res.locals.user=req.user;
    }
    next();
}


module.exports=passport;