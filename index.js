const express= require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=7000;
const db=require('./config/mongo');
 const env=require('./config/environment')
 const logger=require('morgan')



const fs = require('fs');
const path = require('path');
const expressLayouts=require('express-ejs-layouts');

//used for session cookie and aunthenticate
const session=require('express-session');
const MongoStore=require('connect-mongo')
const passport=require('passport');

const passportLocal=require('./config/passport-Local')
const passportJwt=require('./config/passport-jwt-strategy')
const passportGoogle=require('./config/passport-googleOAuth2Strategy');
const flash=require('connect-flash');
const flashMware=require('./config/flashMWare');
const cors=require('cors');
app.use(cors());
//setup web sockets for chatEngine
const chatServer=require('http').Server(app);
const chatSocket=require('./config/chat_sockets').chatSocket(chatServer);
chatServer.listen(3000);
console.log('web socket is running on port:3000');


app.use(cookieParser());
app.use(logger(env.morgan.mode,env.morgan.options))

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set the view engine
app.use(express.static(path.join(__dirname,env.asset_path)));
app.set('view engine','ejs')
app.set('views','./views')
// app.use(express.static('views'))

app.use('/users/profile/css',express.static(path.join(__dirname,'/views/css')))
app.use('/js',express.static(path.join(__dirname,'/views/js')))
app.use('/users/profile/js',express.static(path.join(__dirname,'/views/js')))
app.use('/users/css',express.static(path.join(__dirname,'/views/css')))
app.use('/users/js',express.static(path.join(__dirname,'/views/js')))
app.use('/users/resetPassword/css',express.static(path.join(__dirname,'/views/css')))
app.use('/users/resetPassword/js',express.static(path.join(__dirname,'/views/js')))
app.use('/uploads',express.static(__dirname+'/uploads'))

app.use(session({
    name:'codial',
    //to do change secret key when deploy on server
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: MongoStore.create({ 
        mongoUrl: 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.0', // Replace with your MongoDB connection URL
        autoRemove:'disabled'
        
      },function(err){
        console.log("error in storing cookies in mongo",err)
      }),
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(flashMware.setFlash);


//middlewares for encoded data change in request body
app.use(express.json());
app.use(express.urlencoded({extended:true}));



// use express router
app.use('/',require('./routers/home'));


app.use('/css',express.static(__dirname+'/views/css'));

app.use('/sign-In',require('./routers/signIn'));
app.use('/sign-Up',require('./routers/signUp'));

app.use('/users',require('./routers/users'));

app.use('/post',require('./routers/Post'));
app.use('/comment',require('./routers/comment'));


app.use('/api',require('./routers/api'))
app.use('/likes',require('./routers/LIkes'))
app.use('/friendship',require('./routers/Friendship'))



app.listen(port,function(err){
    if(err){
        console.log(`error in running the server:${err}`)
    }
    console.log(`server is running on port :${port}`)    
});
