const express= require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=7000;
const db=require('./config/mongo');


const expressLayouts=require('express-ejs-layouts');

//used for session cookie and aunthenticate
const session=require('express-session');
const MongoStore=require('connect-mongo')
const passport=require('passport');

const passportLocal=require('./config/passport-Local')


app.use(cookieParser());

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set the view engine
app.set('view engine','ejs')
app.set('views','./views')
app.use(express.static('views'))
app.use(express.static('public'));

app.use(session({
    name:'codial',
    //to do change secret key when deploy on server
    secret:'nanwalLalit',
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


//middlewares for encoded data change in request body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// use express router
app.use('/',require('./routers/home'));


app.use('/sign-In',require('./routers/signIn'));
app.use('/sign-Up',require('./routers/signUp'));

app.use('/users',require('./routers/users'));



app.listen(port,function(err){
    if(err){
        console.log(`error in running the server:${err}`)
    }
    console.log(`server is running on port :${port}`)    
});
