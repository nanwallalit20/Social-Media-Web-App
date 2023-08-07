const express= require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=7000;
const db=require('./config/mongo');
 



const fs = require('fs');
const path = require('path');
const sass = require('node-sass');
const sourceDirectory = './views/scss'; // Replace with the path to your SCSS source directory
const destinationDirectory = './views/css'; // Replace with the path to your CSS destination directory

function compileSassFile(inputFilePath, outputFilePath) {
  const result = sass.renderSync({
    file: inputFilePath,
    outputStyle: 'expanded', // or 'compressed' for minified CSS
  });

  fs.writeFileSync(outputFilePath, result.css);
}

function compileScssDirectory(sourceDir, destDir) {
  const files = fs.readdirSync(sourceDir);

  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, path.parse(file).name + '.css');

    const stats = fs.statSync(sourcePath);
    if (stats.isFile() && path.extname(file) === '.scss') {
      compileSassFile(sourcePath, destPath);
    } else if (stats.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
      }
      compileScssDirectory(sourcePath, destPath);
    }
  });
}


compileScssDirectory(sourceDirectory, destinationDirectory);


const expressLayouts=require('express-ejs-layouts');

//used for session cookie and aunthenticate
const session=require('express-session');
const MongoStore=require('connect-mongo')
const passport=require('passport');

const passportLocal=require('./config/passport-Local')
const flash=require('connect-flash');
const flashMware=require('./config/flashMWare');


app.use(cookieParser());

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set the view engine
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine','ejs')
// app.set('views','./views')
// app.use(express.static('views'))

app.use('/users/profile/css',express.static(__dirname+'/views/css'))
app.use('/uploads',express.static(__dirname+'/uploads'))

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



app.listen(port,function(err){
    if(err){
        console.log(`error in running the server:${err}`)
    }
    console.log(`server is running on port :${port}`)    
});
