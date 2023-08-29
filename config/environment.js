const fs=require('fs')
const rfs=require('rotating-file-stream')
const path=require('path');
const morgan = require('morgan');

const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);

const accesslogStream=rfs.createStream('file.log',{
    interval:'1d',
    path:logDirectory,
})
const development={
    name:'development',
    session_cookie_key:'nanwallalit',
    db:'task_db',
    asset_path:'views',
   smtp:{
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'lnanwal95@gmail.com',
        pass:'uuwnevkfiuhdtcsn'
    }
    },
    google_clientID:'290867098636-cq8n0u57rcmb57feqscaou52j1ei7lst.apps.googleusercontent.com',
    google_clientSecret:'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',
    googgle_success_callbackURL:'http://localhost:7000/users/auth/google/callback', 
    jwt_secretOrKey:'codeial',
    morgan:{
        mode:'dev',
        options:{stream:accesslogStream}

    }
}
const production={
    name:'production',
    session_cookie_key:`${process.env.session_cookie_key}`,
    asset_path:`${process.env.asset_path}`,
    db:'task_db',
    smtp:{
     service:'gmail',
     host:'smtp.gmail.com',
     port:587,
     secure:false,
     auth:{
         user:process.env.SocialMedia_Google_auth_Username,
         pass:process.env.SocialMedia_Google_auth_Password
     }
     },
     google_clientID:`${process.env.google_clientID}`,
     google_clientSecret:process.env.google_clientSecret,
     google_success_callbackURL:process.env.google_success_callbackURL, 
     jwt_secretOrKey:`${process.env.jwt_secretOrKey}`,
     morgan:{
        mode:'combined',
        options:{stream:accesslogStream}

    }
}

module.exports=eval(process.env.SocialMedia_Environment)==undefined?development:eval(process.env.SocialMedia_Environment);  