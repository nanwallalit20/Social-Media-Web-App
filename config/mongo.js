const mongose=require('mongoose');
const env=require('./environment')

mongose.connect(`mongodb://127.0.0.1:27017/${env.db}`);

const db=mongose.connection;

db.on('error',console.error.bind(console,"failed to connect with db"));

db.once('open',function(){
    console.log("succesfully connected to the database");
})