module.exports.chatSocket=function(chatServer){
    let io=require('socket.io')(chatServer, {
        cors: {
          origin: '*',
        }
      });

    io.on('connection',function(socket){
      
        console.log('new connection received',socket.id);

            socket.on('disconnect',function(){
            console.log('socket is disconnected')
        })

        socket.on('join_room',function(data){
            console.log('joining request rec',data)
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined',data);
        })
        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        })
    })
}