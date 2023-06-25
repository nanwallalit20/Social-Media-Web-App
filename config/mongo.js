const mongose=require('mongoose');

mongose.connect('mongodb://127.0.0.1:27017/task_db');

const db=mongose.connection;

db.on('error',console.error.bind(console,"failed to connect with db"));

db.once('open',function(){
    console.log("succesfully connected to the database");
})