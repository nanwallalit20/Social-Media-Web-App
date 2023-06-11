const express= require('express');
const app=express();
const port=7000;

app.listen(port,function(err){
    if(err){
        console.log(`error in running the server:${err}`)
    }
    console.log(`server is running on port :${port}`)    
});
