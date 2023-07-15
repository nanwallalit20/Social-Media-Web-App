const express= require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=7000;

const db=require('./config/mongo');
const TaskList=require('./modals/To-do_list');


app.use(cookieParser());

// set the view engine
app.set('view engine','ejs')
app.set('views','./views')
app.use(express.static('views'))
//middlewares for encoded data change in request body
app.use(express.json());
app.use(express.urlencoded({extended:true}));



// use express router

app.use('/',require('./routers/home'));
app.use('/Add_Task',require('./routers/Add_Task'));
app.use('/Task',require('./routers/Delete_Task'));

app.use('/users',require('./routers/users'));






app.listen(port,function(err){
    if(err){
        console.log(`error in running the server:${err}`)
    }
    console.log(`server is running on port :${port}`)    
});
